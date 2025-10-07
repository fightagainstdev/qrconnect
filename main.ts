import { serveDir } from "https://deno.land/std@0.208.0/http/file_server.ts";

Deno.serve(async (request) => {
  const url = new URL(request.url);

  // Handle API routes
  if (url.pathname.startsWith("/api/")) {
    const route = url.pathname;

    // Static route handlers
    const routes: Record<string, (request: Request) => Promise<Response> | Response> = {
      "/api/auth/me": (await import("./api/auth/me.ts")).default,
      "/api/auth/login": (await import("./api/auth/login.ts")).default,
      "/api/auth/logout": (await import("./api/auth/logout.ts")).default,
      "/api/auth/signup": (await import("./api/auth/signup.ts")).default,
      "/api/auth/onboarding": (await import("./api/auth/onboarding.ts")).default,
      "/api/users": (await import("./api/users/index.ts")).default,
      "/api/users/friends": (await import("./api/users/friends.ts")).default,
      "/api/users/friend-requests": (await import("./api/users/friend-requests.ts")).default,
      "/api/users/outgoing-friend-requests": (await import("./api/users/outgoing-friend-requests.ts")).default,
      "/api/chat/token": (await import("./api/chat/token.ts")).default,
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