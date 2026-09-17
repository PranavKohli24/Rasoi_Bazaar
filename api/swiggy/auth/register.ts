export async function POST(): Promise<Response> {
  const redirectUri =
    process.env.SWIGGY_REDIRECT_URI;

  if (!redirectUri) {
    return new Response(
      "SWIGGY_REDIRECT_URI is not configured.",
      { status: 500 }
    );
  }

  const response = await fetch(
    "https://mcp.swiggy.com/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_name: "Rasoi Bazaar",
        redirect_uris: [redirectUri],
        grant_types: [
          "authorization_code",
        ],
        response_types: ["code"],
        token_endpoint_auth_method: "none",
      }),
    }
  );
  
  const text = await response.text();

  return new Response(text, {
    status: response.status,
    headers: {
      "Content-Type":
        response.headers.get(
          "Content-Type"
        ) ?? "application/json",
    },
  });
}