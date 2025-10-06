export default async (request: Request) => {
  const user = {
    _id: "mockid",
    fullName: "Test User",
    email: "test@example.com",
    bio: "Mock bio",
    profilePic: "https://via.placeholder.com/40",
    nativeLanguage: "English",
    learningLanguage: "Spanish",
    location: "Mock City",
    isOnboarded: true,
    friends: []
  };

  return new Response(JSON.stringify({ user }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
};