import { defineConfig, type Plugin } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";

/** vinext ignores next.config webpack/turbopack loaders; keep chapter .md as strings. */
function markdownRaw(): Plugin {
  return {
    name: "markdown-raw",
    transform(code, id) {
      if (!id.split("?")[0].endsWith(".md")) return;
      return {
        code: `export default ${JSON.stringify(code)}`,
        map: null,
      };
    },
  };
}

export default defineConfig({
  plugins: [
    markdownRaw(),
    vinext(),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
    tailwindcss(),
  ],
  build: {
    rolldownOptions: {
      external: ["cloudflare:workers"],
    },
  },
});
