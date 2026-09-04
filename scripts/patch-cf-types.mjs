#!/usr/bin/env node
/** Remove mainModule from generated types so Next build does not typecheck worker/index.ts. */
import fs from "node:fs";

const path = new URL("../cloudflare-env.d.ts", import.meta.url);
let src = fs.readFileSync(path, "utf8");
src = src.replace(
  /\tinterface GlobalProps \{\n\t\tmainModule: typeof import\([^)]+\);\n\t\}\n/,
  ""
);
fs.writeFileSync(path, src);
