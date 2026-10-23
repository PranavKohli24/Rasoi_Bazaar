import crypto from "node:crypto";

const SWIGGY_BASE_URL = "https://mcp.swiggy.com";

// ---------- shared helpers ----------

function getCookie(request: Request, name: string): string | null {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookies = cookieHeader.split(";").map((c) => c.trim()).filter(Boolean);

  for (const cookie of cookies) {
    const sep = cookie.indexOf("=");
    if (sep === -1) continue;
    const key = cookie.slice(0, sep);
    const value = cookie.slice(sep + 1);
    if (key === name) return decodeURIComponent(value);
  }

  return null;
}

function getRedirectUri(): string {
  const redirectUri = process.env.SWIGGY_REDIRECT_URI;
  if (!redirectUri) throw new Error("SWIGGY_REDIRECT_URI is not configured");
  return redirectUri;
}

function base64Url(buffer: Buffer) {
  return buffer.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function createPkce() {
  const verifier = base64Url(crypto.randomBytes(32));
  const challenge = base64Url(crypto.createHash("sha256").update(verifier).digest());
  return { verifier, challenge };
}

function getAction(request: Request): string {
  const url = new URL(request.url, "http://localhost:3000");
  const segments = url.pathname.split("/").filter(Boolean);
  return segments[segments.length - 1] ?? "";
}

// ---------- /register ----------

async function handleRegister(): Promise<Response> {
  const redirectUri = process.env.SWIGGY_REDIRECT_URI;
  if (!redirectUri) {
    return new Response("SWIGGY_REDIRECT_URI is not configured.", { status: 500 });
  }

  const response = await fetch(`${SWIGGY_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_name: "Rasoi Bazaar",
      redirect_uris: [redirectUri],
      grant_types: ["authorization_code"],
      response_types: ["code"],
      token_endpoint_auth_method: "none",
    }),
  });

  const text = await response.text();

  return new Response(text, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") ?? "application/json",
    },
  });
}

// ---------- /start ----------
async function handleStart(request: Request): Promise<Response> {
  const REDIRECT_URI = getRedirectUri();
  const { verifier, challenge } = createPkce();
  const state = crypto.randomBytes(24).toString("hex");
  const isPopup = new URL(request.url, "http://localhost:3000").searchParams.get("popup") === "1";

  const registerResponse = await fetch(`${SWIGGY_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_name: "Rasoi Bazaar",
      redirect_uris: [REDIRECT_URI],
      grant_types: ["authorization_code"],
      response_types: ["code"],
      token_endpoint_auth_method: "none",
    }),
  });

  if (!registerResponse.ok) {
    return new Response("Could not register with Swiggy.", { status: 500 });
  }

  const registerData = await registerResponse.json();
  const clientId = registerData.client_id;

  if (!clientId) {
    return new Response("Swiggy did not return a client_id", { status: 500 });
  }

  const authUrl = new URL(`${SWIGGY_BASE_URL}/auth/authorize`);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
  authUrl.searchParams.set("code_challenge", challenge);
  authUrl.searchParams.set("code_challenge_method", "S256");
  authUrl.searchParams.set("state", state);

  const oauthData = Buffer.from(
    JSON.stringify({ state, verifier, clientId, redirectUri: REDIRECT_URI, popup: isPopup })
  ).toString("base64url");

  const headers = new Headers();
  headers.set("Location", authUrl.toString());

  const isProd = process.env.NODE_ENV === "production";

  headers.append(
    "Set-Cookie",
    [
      `swiggy_oauth=${encodeURIComponent(oauthData)}`,
      "HttpOnly",
      "Path=/",
      "SameSite=Lax",
      ...(isProd ? ["Secure"] : []),
      "Max-Age=600",
    ].join("; ")
  );

  return new Response(null, { status: 302, headers });
}

// ---------- /callback ----------

function popupResultHtml(success: boolean, message?: string): string {
  return `<!doctype html><html><head><title>Swiggy</title></head>
  <body>
    <script>
      if (window.opener) {
        window.opener.postMessage(
          { type: ${success ? '"swiggy-auth-success"' : '"swiggy-auth-failure"'} },
          window.location.origin
        );
      }
      window.close();
    </script>
    <p>${success ? "Connected! You can close this window." : (message ?? "Connection failed.") + " You can close this window."}</p>
  </body></html>`;
}

async function handleCallback(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url, "http://localhost:3000");
  const code = requestUrl.searchParams.get("code");
  const returnedState = requestUrl.searchParams.get("state");
  const oauthError = requestUrl.searchParams.get("error");
  const oauthErrorDescription = requestUrl.searchParams.get("error_description");

  const oauthCookie = getCookie(request, "swiggy_oauth");
  let stored: { state: string; verifier: string; clientId: string; redirectUri: string; popup?: boolean } | null = null;
  if (oauthCookie) {
    try {
      stored = JSON.parse(Buffer.from(oauthCookie, "base64url").toString("utf8"));
    } catch {
      stored = null;
    }
  }
  const isPopup = !!stored?.popup;

  const fail = (message: string, status = 400): Response => {
    if (isPopup) {
      return new Response(popupResultHtml(false, message), { status, headers: { "Content-Type": "text/html" } });
    }
    return new Response(
      `<!doctype html><html><head><title>Swiggy Authorization Failed</title></head>
      <body><h2>Swiggy authorization failed</h2><p>${message}</p>
      <script>window.location.href = "/";</script></body></html>`,
      { status, headers: { "Content-Type": "text/html" } }
    );
  };

  try {
    if (oauthError) return fail(oauthErrorDescription ?? oauthError);
    if (!code) return fail("Missing authorization code.");
    if (!returnedState) return fail("Missing OAuth state.");
    if (!stored) return fail("OAuth session expired. Please start the Swiggy login again.");
    if (stored.state !== returnedState) return fail("Invalid OAuth state.");

    const tokenResponse = await fetch(`${SWIGGY_BASE_URL}/auth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        code_verifier: stored.verifier,
        client_id: stored.clientId,
        redirect_uri: stored.redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const errText = await tokenResponse.text();
      console.error("Swiggy token exchange failed:", tokenResponse.status, errText);
      return fail("Token exchange failed.", 500);
    }

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error("Swiggy token response:", tokenData);
      return fail("Swiggy did not return an access token.", 500);
    }

    const expiresIn = Number(tokenData.expires_in ?? 432000);
    const session = { accessToken: tokenData.access_token, expiresAt: Date.now() + expiresIn * 1000 };
    const encodedSession = Buffer.from(JSON.stringify(session)).toString("base64url");

    const headers = new Headers();
    headers.append("Content-Type", "text/html; charset=utf-8");

    const isProd = process.env.NODE_ENV === "production";

    headers.append(
      "Set-Cookie",
      [
        `swiggy_session=${encodeURIComponent(encodedSession)}`,
        "HttpOnly",
        "Path=/",
        "SameSite=Lax",
        ...(isProd ? ["Secure"] : []),
        `Max-Age=${expiresIn}`,
      ].join("; ")
    );

    headers.append(
      "Set-Cookie",
      ["swiggy_oauth=", "HttpOnly", "Path=/", "SameSite=Lax", ...(isProd ? ["Secure"] : []), "Max-Age=0"].join("; ")
    );

    const body = isPopup
      ? popupResultHtml(true)
      : `<!doctype html><html><head><title>Swiggy Connected</title></head>
        <body><p>Swiggy connected successfully.</p><p>Redirecting to Rasoi Bazaar...</p>
        <script>window.location.replace("/");</script></body></html>`;

    return new Response(body, { status: 200, headers });
  } catch (error) {
    console.error("Swiggy callback error:", error);
    return fail(error instanceof Error ? error.message : "Swiggy authentication failed.", 500);
  }
}

// ---------- routers ----------

export async function GET(request: Request): Promise<Response> {
  const action = getAction(request);

  switch (action) {
    case "start":
      return handleStart(request);
    case "callback":
      return handleCallback(request);
    default:
      return new Response("Not found", { status: 404 });
  }
}

export async function POST(request: Request): Promise<Response> {
  const action = getAction(request);

  switch (action) {
    case "register":
      return handleRegister();
    default:
      return new Response("Not found", { status: 404 });
  }
}