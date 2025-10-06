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

  // Serve static files, fallback to index.html for SPA routes
  try {
    const response = await serveDir(request, {
      fsRoot: ".",
      urlRoot: "",
    });
    if (response.status === 404 && !url.pathname.includes(".")) {
      // For SPA routes without extension, serve index.html
      return serveDir(new Request(`${url.origin}/index.html`), {
        fsRoot: ".",
        urlRoot: "",
      });
    }
    return response;
  } catch {
    return new Response("Not Found", { status: 404 });
  }
});