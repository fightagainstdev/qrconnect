import { Application, Router } from "oak";
import { extname } from "https://deno.land/std@0.208.0/path/mod.ts";

function getContentType(ext: string): string {
  switch (ext) {
    case ".html": return "text/html";
    case ".js": return "application/javascript";
    case ".css": return "text/css";
    case ".png": return "image/png";
    case ".jpg": return "image/jpeg";
    case ".svg": return "image/svg+xml";
    case ".woff": return "font/woff";
    case ".woff2": return "font/woff2";
    default: return "text/plain";
  }
}

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
    const path = ctx.request.url.pathname;
    let filePath = `_static${path}`;
    if (path === "/") filePath = "_static/index.html";
    try {
      const file = await Deno.readFile(filePath);
      const ext = extname(filePath);
      const contentType = getContentType(ext);
      ctx.response.headers.set("Content-Type", contentType);
      ctx.response.body = file;
    } catch {
      ctx.response.status = 404;
      ctx.response.body = "Not found";
    }
  }
});

console.log("Server starting");

await app.listen();