#!/usr/bin/env node
/**
 * Exercise the Worker email() handler locally (after `npm run preview`).
 *
 *   npm run preview
 *   npm run email:test -- --port 8787
 */
import { execSync } from "node:child_process";

const port = process.argv.includes("--port")
  ? process.argv[process.argv.indexOf("--port") + 1]
  : "8787";

const raw = `From: tester@example.com
To: president@gatorredleg.org
Subject: Board inbound smoke test
Message-ID: <board-inbound-smoke-test@example.com>
Content-Type: text/plain; charset=utf-8

This is a smoke test for the chapter board inbound email handler.`;

const url = `http://localhost:${port}/cdn-cgi/handler/email?from=tester@example.com&to=president@gatorredleg.org`;

try {
  execSync(
    `curl -sf -X POST '${url}' -H 'Content-Type: message/rfc822' --data-binary @-`,
    { input: raw, stdio: ["pipe", "inherit", "inherit"] }
  );
  console.log("\nEmail handler accepted the message.");
} catch {
  console.error("\nEmail handler test failed (is wrangler preview running?)");
  process.exit(1);
}
