const SWIGGY_URL = "https://mcp.swiggy.com/im";

function getCookie(
  request: Request,
  name: string
): string | null {
  const cookieHeader =
    request.headers.get("cookie") ?? "";

  for (const cookie of cookieHeader.split(";")) {
    const [key, ...parts] = cookie.trim().split("=");

    if (key === name) {
      return decodeURIComponent(parts.join("="));
    }
  }

  return null;
}

export async function GET(
  request: Request
): Promise<Response> {
  try {
    const sessionCookie = getCookie(
      request,
      "swiggy_session"
    );

    if (!sessionCookie) {
      return new Response(
        "No Swiggy session found",
        { status: 401 }
      );
    }

    const session = JSON.parse(
      Buffer.from(
        sessionCookie,
        "base64url"
      ).toString("utf8")
    );

    const response = await fetch(
      SWIGGY_URL,
      {
        method: "POST",
        headers: {
          "Authorization":
            `Bearer ${session.accessToken}`,

          "Content-Type":
            "application/json",

          "Accept":
            "application/json, text/event-stream",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
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

    const text = await response.text();

    console.log(
      "Swiggy response:",
      response.status,
      text
    );

    return new Response(text, {
      status: response.status,
      headers: {
        "Content-Type":
          "application/json",
      },
    });
  } catch (error) {
    console.error(
      "Address test failed:",
      error
    );

    return new Response(
      error instanceof Error
        ? error.message
        : "Unknown error",
      { status: 500 }
    );
  }
}