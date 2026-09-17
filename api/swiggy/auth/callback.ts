const SWIGGY_BASE_URL = "https://mcp.swiggy.com";

function getCookie(
  request: Request,
  name: string
): string | null {
  const cookieHeader =
    request.headers.get("cookie") ?? "";

  const cookies = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .filter(Boolean);

  for (const cookie of cookies) {
    const separatorIndex = cookie.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = cookie.slice(0, separatorIndex);
    const value = cookie.slice(separatorIndex + 1);

    if (key === name) {
      return decodeURIComponent(value);
    }
  }

  return null;
}

export async function GET(
  request: Request
): Promise<Response> {
  try {
    /*
     * IMPORTANT:
     * Vercel local dev may give us a relative
     * request URL, so don't do new URL(request.url).
     */

    const requestUrl = new URL(
      request.url,
      "http://localhost:3000"
    );

    const code =
      requestUrl.searchParams.get("code");

    const returnedState =
      requestUrl.searchParams.get("state");

    const oauthError =
      requestUrl.searchParams.get("error");

    const oauthErrorDescription =
      requestUrl.searchParams.get(
        "error_description"
      );

    if (oauthError) {
      return new Response(
        `
        <!doctype html>
        <html>
          <head>
            <title>Swiggy Authorization Failed</title>
          </head>

          <body>
            <h2>Swiggy authorization failed</h2>
            <p>${oauthErrorDescription ?? oauthError}</p>

            <script>
              window.location.href = "/";
            </script>
          </body>
        </html>
        `,
        {
          status: 400,
          headers: {
            "Content-Type": "text/html",
          },
        }
      );
    }

    if (!code) {
      return new Response(
        "Missing authorization code.",
        {
          status: 400,
        }
      );
    }

    if (!returnedState) {
      return new Response(
        "Missing OAuth state.",
        {
          status: 400,
        }
      );
    }

    /*
     * Read the temporary OAuth cookie.
     */
    const oauthCookie = getCookie(
      request,
      "swiggy_oauth"
    );

    if (!oauthCookie) {
      return new Response(
        "OAuth session expired. Please start the Swiggy login again.",
        {
          status: 400,
        }
      );
    }

    let stored: {
      state: string;
      verifier: string;
      clientId: string;
      redirectUri: string;
    };

    try {
      stored = JSON.parse(
        Buffer.from(
          oauthCookie,
          "base64url"
        ).toString("utf8")
      );
    } catch {
      return new Response(
        "Invalid OAuth session data.",
        {
          status: 400,
        }
      );
    }

    /*
     * Verify that this callback belongs
     * to the OAuth request we started.
     */
    if (
      stored.state !== returnedState
    ) {
      return new Response(
        "Invalid OAuth state.",
        {
          status: 400,
        }
      );
    }

    /*
     * Exchange authorization code
     * for Swiggy access token.
     */
    const tokenResponse = await fetch(
      `${SWIGGY_BASE_URL}/auth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          grant_type:
            "authorization_code",

          code,

          code_verifier:
            stored.verifier,

          client_id:
            stored.clientId,

          redirect_uri:
            stored.redirectUri,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorText =
        await tokenResponse.text();

      console.error(
        "Swiggy token exchange failed:",
        tokenResponse.status,
        errorText
      );

      return new Response(
        `
        <!doctype html>
        <html>
          <head>
            <title>Swiggy Connection Failed</title>
          </head>

          <body>
            <h2>Could not connect Swiggy</h2>
            <p>Token exchange failed.</p>
            <pre>${errorText}</pre>
          </body>
        </html>
        `,
        {
          status: 500,
          headers: {
            "Content-Type":
              "text/html",
          },
        }
      );
    }

    const tokenData =
      await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error(
        "Swiggy token response:",
        tokenData
      );

      return new Response(
        "Swiggy did not return an access token.",
        {
          status: 500,
        }
      );
    }

    /*
     * Store the Swiggy session.
     */
    const expiresIn = Number(
      tokenData.expires_in ?? 432000
    );

    const session = {
      accessToken:
        tokenData.access_token,
      expiresAt:
        Date.now() +
        expiresIn * 1000,
    };

    const encodedSession =
      Buffer.from(
        JSON.stringify(session)
      ).toString("base64url");

    const headers = new Headers();

    headers.append(
      "Content-Type",
      "text/html; charset=utf-8"
    );

    /*
     * Store authenticated session.
     */
    headers.append(
      "Set-Cookie",
      [
        `swiggy_session=${encodeURIComponent(
          encodedSession
        )}`,
        "HttpOnly",
        "Path=/",
        "SameSite=Lax",
        "Secure",
        `Max-Age=${expiresIn}`,
      ].join("; ")
    );

    /*
     * Clear temporary OAuth cookie.
     */
    headers.append(
      "Set-Cookie",
      [
        "swiggy_oauth=",
        "HttpOnly",
        "Path=/",
        "SameSite=Lax",
        "Secure",
        "Max-Age=0",
      ].join("; ")
    );

    /*
     * Back to Rasoi Bazaar.
     */
    return new Response(
      `
      <!doctype html>
      <html>
        <head>
          <title>Swiggy Connected</title>
        </head>

        <body>
          <p>Swiggy connected successfully.</p>
          <p>Redirecting to Rasoi Bazaar...</p>

          <script>
            window.location.replace("/");
          </script>
        </body>
      </html>
      `,
      {
        status: 200,
        headers,
      }
    );
  } catch (error) {
    console.error(
      "Swiggy callback error:",
      error
    );

    return new Response(
      error instanceof Error
        ? error.message
        : "Swiggy authentication failed.",
      {
        status: 500,
      }
    );
  }
}