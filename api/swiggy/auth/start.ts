import crypto from "node:crypto";

const SWIGGY_BASE_URL = "https://mcp.swiggy.com";

const REDIRECT_URI =
  "http://localhost:3000/api/swiggy/auth/callback";

function base64Url(buffer: Buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function createPkce() {
  const verifier = base64Url(
    crypto.randomBytes(32)
  );

  const challenge = base64Url(
    crypto
      .createHash("sha256")
      .update(verifier)
      .digest()
  );

  return {
    verifier,
    challenge,
  };
}

export async function GET(): Promise<Response> {
  const {
    verifier,
    challenge,
  } = createPkce();

  const state = crypto
    .randomBytes(24)
    .toString("hex");

  const registerResponse = await fetch(
  `${SWIGGY_BASE_URL}/auth/register`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_name: "Rasoi Bazaar",
      redirect_uris: [REDIRECT_URI],
      grant_types: ["authorization_code"],
      response_types: ["code"],
      token_endpoint_auth_method: "none",
    }),
  }
);

if (!registerResponse.ok) {
  return new Response(
    "Could not register with Swiggy.",
    { status: 500 }
  );
}

const registerData = await registerResponse.json();
const clientId = registerData.client_id;

if (!clientId) {
  return new Response(
    "Swiggy did not return a client_id",
    { status: 500 }
  );
}

  const authUrl = new URL(
    `${SWIGGY_BASE_URL}/auth/authorize`
  );

  authUrl.searchParams.set(
    "response_type",
    "code"
  );

  authUrl.searchParams.set(
    "client_id",
    clientId
  );

  authUrl.searchParams.set(
    "redirect_uri",
    REDIRECT_URI
  );

  authUrl.searchParams.set(
    "code_challenge",
    challenge
  );

  authUrl.searchParams.set(
    "code_challenge_method",
    "S256"
  );

  authUrl.searchParams.set(
    "state",
    state
  );

  const oauthData = Buffer.from(
    JSON.stringify({
      state,
      verifier,
      clientId,
      redirectUri: REDIRECT_URI,
    })
  ).toString("base64url");

  const headers = new Headers();

  headers.set(
    "Location",
    authUrl.toString()
  );

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

  return new Response(null, {
    status: 302,
    headers,
  });
}