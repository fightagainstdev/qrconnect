export default async (request: Request) => {
  if (request.method !== "PUT") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // Mock accept friend request response
  const response = {
    message: "Friend request accepted",
  };

  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
};