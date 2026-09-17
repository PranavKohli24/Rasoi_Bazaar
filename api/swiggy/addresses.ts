function getCookie(
  request: Request,
  name: string
): string | null {
  const cookieHeader =
    request.headers.get("cookie") ?? "";

  for (const cookie of cookieHeader.split(";")) {
    const [key, ...parts] =
      cookie.trim().split("=");

    if (key === name) {
      return decodeURIComponent(
        parts.join("=")
      );
    }
  }

  return null;
}

function parseSwiggyResponse(
  text: string
): any {
  try {
    return JSON.parse(text);
  } catch {
    // Try SSE below
  }

  const lines = text.split(/\r?\n/);

  for (const line of lines) {
    if (!line.startsWith("data:")) {
      continue;
    }

    const data = line
      .slice(5)
      .trim();

    if (!data) {
      continue;
    }

    try {
      return JSON.parse(data);
    } catch {
      continue;
    }
  }

  return null;
}

export async function GET(
  request: Request
): Promise<Response> {
  try {
    const sessionCookie =
      getCookie(
        request,
        "swiggy_session"
      );

    if (!sessionCookie) {
      return new Response(
        JSON.stringify({
          error:
            "SWIGGY_NOT_CONNECTED",
        }),
        {
          status: 401,
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );
    }

    const session = JSON.parse(
      Buffer.from(
        sessionCookie,
        "base64url"
      ).toString("utf8")
    );

    const swiggyResponse =
      await fetch(
        "https://mcp.swiggy.com/im",
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${session.accessToken}`,

            "Content-Type":
              "application/json",

            Accept:
              "application/json, text/event-stream",
          },

          body: JSON.stringify({
            jsonrpc: "2.0",
            id: Date.now(),

            method: "tools/call",

            params: {
              name: "get_addresses",

              arguments: {
                page: 1,
                pageSize: 10,
              },
            },
          }),
        }
      );

    const text =
      await swiggyResponse.text();

    const data =
      parseSwiggyResponse(text);

    if (!data) {
      return new Response(
        JSON.stringify({
          error:
            "Could not parse Swiggy address response",
        }),
        {
          status: 502,
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify(data),
      {
        status:
          swiggyResponse.status,

        headers: {
          "Content-Type":
            "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "Get addresses error:",
      error
    );

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Failed to get addresses",
      }),
      {
        status: 500,

        headers: {
          "Content-Type":
            "application/json",
        },
      }
    );
  }
}