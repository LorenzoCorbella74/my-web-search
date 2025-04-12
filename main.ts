import { serveDir } from "@std/http/file-server";
import { getResults } from "./routes.ts";

const PORT = 3000;

// make sure to set the environment variable BRAVE_API_KEY
export const apiKey = Deno.env.get("BRAVE_API_KEY");
if (!apiKey) {
  console.error("Please set the BRAVE_API_KEY environment variable");
  Deno.exit(1);
}

async function handleRequest(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  console.log(`Handling request for ${pathname} - ${request.method}`);

  if (pathname.startsWith("/api/search")) {
    const params = new URLSearchParams({
      q: request.url.split("?q=")[1],
      count: "10",
    });
    const results = await getResults(params);
    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // Serve static files from the "public" directory
  console.log(`Serving static file for ${pathname}`);
  return serveDir(request, {
    fsRoot: "static",
  });
}

console.log(`Server running at http://localhost:${PORT}`);

Deno.serve({ port: PORT }, handleRequest);