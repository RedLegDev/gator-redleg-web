import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  // Red Leg Dev account — gatorredleg.org and Email Sending live here.
  accountId: "ab1da25c524f59bc61f776304bd88558",
  worker: defineWorker({
    // Must stay `gator-redleg-web` — custom domains, secrets, and Email Routing
    // catch-all (*@gatorredleg.org → this Worker) are on this name. Catch-all
    // is dashboard-managed; do not add triggers.email — Builds token cannot
    // write email_routing and omit is a no-op on existing rules.
    name: "gator-redleg-web",
    entrypoint: "./worker/index.ts",
    compatibilityDate: "2025-12-01",
    compatibilityFlags: ["nodejs_compat"],
    domains: ["gatorredleg.org", "www.gatorredleg.org"],
    workersDev: true,
    previewUrls: true,
    assets: { notFoundHandling: "none" },
    observability: {
      enabled: false,
      logs: {
        enabled: true,
        headSamplingRate: 1,
        persist: true,
        invocationLogs: true,
      },
      traces: {
        enabled: false,
        persist: true,
        headSamplingRate: 1,
      },
    },
    env: {
      ASSETS: bindings.assets(),
      DB: bindings.d1({
        name: "gator-board",
        id: "ff4b4f12-7552-40f4-a6fe-596a12fe0b75",
      }),
      ATTACHMENTS: bindings.r2({ name: "gator-board-attachments" }),
      SEND_EMAIL: bindings.sendEmail({ dev: { remote: true } }),
      BOARD_INBOX_FORWARD: bindings.text(""),
      VAPID_PUBLIC_KEY: bindings.text(
        "BJSF_nHvxRDhKhKs4NrZIu7E-jZLcYLNIKuWr-JIL7_JrJw7eqbzxSIO_-57MQFELtbFs3FxjR1q0MyJl29JP1A"
      ),
      VAPID_SUBJECT: bindings.text("mailto:president@gatorredleg.org"),
      BOARD_ALLOWLIST: bindings.secret(),
      BOARD_CRON_SECRET: bindings.secret(),
      BOARD_INBOUND_WEBHOOK_SECRET: bindings.secret(),
      BOARD_PRESIDENT_ALLOWLIST: bindings.secret(),
      BOARD_SESSION_SECRET: bindings.secret(),
      BOARD_STORE_WEBHOOK_SECRET: bindings.secret(),
      VAPID_PRIVATE_KEY: bindings.secret(),
    },
  }),
});
