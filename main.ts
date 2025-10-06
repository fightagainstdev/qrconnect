import { serveDir } from "https://deno.land/std@0.208.0/http/file_server.ts";

Deno.serve(async (request) => {
  const url = new URL(request.url);

  // Handle API routes
  if (url.pathname.startsWith("/api/")) {
    try {
      const modulePath = `./${url.pathname}.ts`;
      const handler = (await import(modulePath)).default;
      return handler(request);
    } catch (error) {
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