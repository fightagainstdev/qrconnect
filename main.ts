import { Application, Router, send } from "oak";

// Environment variables loaded automatically in Deno Deploy

const app = new Application();
const router = new Router();

// Mock DB connection (not needed for mock API)
console.log("Using mock API");

// CORS middleware
app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 200;
    return;
  }
  await next();
});

// JSON middleware removed for mock API

// Mock routes for basic functionality
router.get("/api/auth/me", (ctx) => {
  ctx.response.body = {
    user: {
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

router.get("/api/users/outgoing-friend-requests", (ctx) => {
  ctx.response.body = [];
});

router.post("/api/auth/logout", (ctx) => {
  ctx.response.body = { message: "Logged out" };
});

// Add more routes as needed

app.use(router.routes());
app.use(router.allowedMethods());

// Serve static files
app.use(async (ctx, next) => {
  if (ctx.request.url.pathname.startsWith("/api")) {
    await next();
  } else {
    await send(ctx, ctx.request.url.pathname, {
      root: "_static",
      index: "index.html",
    });
  }
});

console.log("Server starting");

await app.listen();