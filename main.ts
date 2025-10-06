import { Application, Router } from "oak";
import { cors } from "cors";

// Environment variables loaded automatically in Deno Deploy

const app = new Application();
const router = new Router();

// Mock DB connection (not needed for mock API)
console.log("Using mock API");

// CORS middleware
app.use(cors({
  origin: "*", // For production, set to your frontend URL
  credentials: true,
}));

// JSON middleware
app.use(async (ctx, next) => {
  if (ctx.request.method === "POST" || ctx.request.method === "PUT") {
    const body = await ctx.request.body().value;
    ctx.state.body = body;
  }
  await next();
});

// Mock routes for basic functionality
router.get("/api/auth/me", (ctx) => {
  ctx.response.body = {
    user: {
      _id: "mockid",
      fullName: "Test User",
      email: "test@example.com",
      bio: "Mock bio",
      profilePic: "",
      nativeLanguage: "English",
      learningLanguage: "Spanish",
      location: "Mock City",
      isOnboarded: true,
      friends: []
    }
  };
});

router.get("/api/users", (ctx) => {
  ctx.response.body = [];
});

router.get("/api/users/friends", (ctx) => {
  ctx.response.body = [];
});

router.get("/api/users/friend-requests", (ctx) => {
  ctx.response.body = [];
});

router.get("/api/chat/token", (ctx) => {
  ctx.response.body = { token: "mocktoken" };
});

// Add more routes as needed

app.use(router.routes());
app.use(router.allowedMethods());

// Serve static files for production
if (Deno.env.get("NODE_ENV") === "production") {
  app.use(async (ctx, next) => {
    try {
      await ctx.send({
        root: "_static",
        index: "index.html",
      });
    } catch {
      await next();
    }
  });
}

const PORT = parseInt(Deno.env.get("PORT") || "5001");

console.log(`Server running on port ${PORT}`);

await app.listen({ port: PORT });