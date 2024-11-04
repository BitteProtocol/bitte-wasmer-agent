import { Elysia } from "elysia";
import { runPythonWithManifest } from "./src/wasmer";
import { pluginData } from "./src/manifest";
import { cors } from '@elysiajs/cors'
import * as dotenv from "dotenv";

// Reload environment variables
dotenv.config({ override: true });

const app = new Elysia()
  .use(cors())
  .get("/.well-known/ai-plugin.json", async () => {
    // Force reload env vars on each request
    dotenv.config({ override: true });
    return pluginData();
  })
  .get("/code", async ({ query }) => {
    try {
      console.log("Received request");
      console.log(query);
      // Force reload env vars on each request
      dotenv.config({ override: true });
      
      const { code } = query;
      if (!code) {
        return { success: false, error: "No code provided" };
      }

      // Decode URL-encoded code parameter
      const decodedCode = decodeURIComponent(code);
      const output = await runPythonWithManifest(decodedCode);

      // Handle error object returned from runPythonWithManifest
      if (typeof output === 'object' && 'error' in output) {
        return { 
          success: false, 
          error: output.message 
        };
      }

      // Handle successful string output
      return { 
        success: true, 
        output 
      };

    } catch (error) {
      console.error("Error executing code:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "An unknown error occurred"
      };
    }
  })
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
