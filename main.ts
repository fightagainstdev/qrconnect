import { serveDir } from "https://deno.land/std@0.208.0/http/file_server.ts";

// Import API handlers
import meHandler from "./api/auth/me.ts";
import loginHandler from "./api/auth/login.ts";
import logoutHandler from "./api/auth/logout.ts";
import signupHandler from "./api/auth/signup.ts";
import onboardingHandler from "./api/auth/onboarding.ts";
import usersHandler from "./api/users/index.ts";
import friendsHandler from "./api/users/friends.ts";
import friendRequestsHandler from "./api/users/friend-requests.ts";
import outgoingFriendRequestsHandler from "./api/users/outgoing-friend-requests.ts";
import chatTokenHandler from "./api/chat/token.ts";

Deno.serve(async (request) => {
  const url = new URL(request.url);

  // Handle API routes
  if (url.pathname.startsWith("/api/")) {
    const route = url.pathname;

    // Static route handlers
    const routes: Record<string, (request: Request) => Promise<Response> | Response> = {
      "/api/auth/me": meHandler,
      "/api/auth/login": loginHandler,
      "/api/auth/logout": logoutHandler,
      "/api/auth/signup": signupHandler,
      "/api/auth/onboarding": onboardingHandler,
      "/api/users": usersHandler,
      "/api/users/friends": friendsHandler,
      "/api/users/friend-requests": friendRequestsHandler,
      "/api/users/outgoing-friend-requests": outgoingFriendRequestsHandler,
      "/api/chat/token": chatTokenHandler,
    };

    // Dynamic routes
    if (route.match(/^\/api\/users\/friend-request\/\w+$/)) {
      return (await import("./api/users/friend-request.ts")).default(request);
    } else if (route.match(/^\/api\/users\/friend-request\/\w+\/accept$/)) {
      return (await import("./api/users/friend-request-accept.ts")).default(request);
    }

    const handler = routes[route];
    if (handler) {
      return handler(request);
    } else {
      return new Response("Not Found", { status: 404 });
    }
  }

  // Serve static files or index.html for SPA
  const isStatic = url.pathname.includes(".") || url.pathname.startsWith("/assets/");
  if (isStatic) {
    try {
      return await serveDir(request, {
        fsRoot: ".",
        urlRoot: "",
      });
    } catch {
      return new Response("Not Found", { status: 404 });
    }
  } else {
    // For SPA routes, serve index.html
    try {
      return await serveDir(new Request(`${url.origin}/index.html`), {
        fsRoot: ".",
        urlRoot: "",
      });
    } catch {
      return new Response("Not Found", { status: 404 });
    }
  }
});