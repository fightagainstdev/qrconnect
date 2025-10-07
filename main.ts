import { serveDir } from "https://deno.land/std@0.208.0/http/file_server.ts";

Deno.serve(async (request) => {
  const url = new URL(request.url);

  // Handle API routes
  if (url.pathname.startsWith("/api/")) {
    const route = url.pathname;

    // Static route handlers
    const routes: Record<string, (request: Request) => Response> = {
      "/api/auth/me": (request: Request) => {
        return new Response('{"user":{"id":"test"}}', {
          headers: { "Content-Type": "application/json" }
        });
      },
      "/api/auth/login": (request: Request) => {
        if (request.method === "OPTIONS") {
          return new Response(null, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
          });
        }

        if (request.method !== "POST") {
          return new Response("Method Not Allowed", { status: 405 });
        }

        // Mock login response
        const response = {
          message: "Login successful",
          token: "mock-jwt-token",
          user: {
            _id: "mockid",
            fullName: "Test User",
            email: "test@example.com",
          }
        };

        return new Response(JSON.stringify(response), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
      },
      "/api/auth/logout": (request: Request) => {
        if (request.method === "OPTIONS") {
          return new Response(null, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
          });
        }

        return new Response(JSON.stringify({ message: "Logged out" }), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
      },
      "/api/auth/signup": (request: Request) => {
        if (request.method === "OPTIONS") {
          return new Response(null, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
          });
        }

        if (request.method !== "POST") {
          return new Response("Method Not Allowed", { status: 405 });
        }

        // Mock signup response
        const response = {
          message: "Signup successful",
          token: "mock-jwt-token",
          user: {
            _id: "mockid",
            fullName: "New User",
            email: "new@example.com",
          }
        };

        return new Response(JSON.stringify(response), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
      },
      "/api/auth/onboarding": (request: Request) => {
        if (request.method === "OPTIONS") {
          return new Response(null, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
          });
        }

        if (request.method !== "POST") {
          return new Response("Method Not Allowed", { status: 405 });
        }

        // Mock onboarding response
        const response = {
          message: "Onboarding completed",
          user: {
            _id: "mockid",
            fullName: "Test User",
            email: "test@example.com",
            isOnboarded: true,
          }
        };

        return new Response(JSON.stringify(response), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
      },
      "/api/users": (request: Request) => {
        if (request.method === "OPTIONS") {
          return new Response(null, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
          });
        }

        return new Response(JSON.stringify([]), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
      },
      "/api/users/friends": (request: Request) => {
        if (request.method === "OPTIONS") {
          return new Response(null, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
          });
        }

        return new Response(JSON.stringify([]), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
      },
      "/api/users/friend-requests": (request: Request) => {
        if (request.method === "OPTIONS") {
          return new Response(null, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
          });
        }

        return new Response(JSON.stringify([]), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
      },
      "/api/users/outgoing-friend-requests": (request: Request) => {
        if (request.method === "OPTIONS") {
          return new Response(null, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
          });
        }

        return new Response(JSON.stringify([]), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
      },
      "/api/chat/token": (request: Request) => {
        if (request.method === "OPTIONS") {
          return new Response(null, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
          });
        }

        return new Response(JSON.stringify({ token: "mocktoken" }), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
      },
    };

    // Dynamic routes
    if (route.match(/^\/api\/users\/friend-request\/\w+$/)) {
      if (request.method === "OPTIONS") {
        return new Response(null, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
      }

      if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
      }

      // Mock send friend request response
      const response = {
        message: "Friend request sent",
      };

      return new Response(JSON.stringify(response), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    } else if (route.match(/^\/api\/users\/friend-request\/\w+\/accept$/)) {
      if (request.method === "OPTIONS") {
        return new Response(null, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
      }

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