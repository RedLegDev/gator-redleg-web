/// <reference types="@cloudflare/workers-types" />

declare namespace Cloudflare {
  interface Env {
    DB: D1Database;
    ATTACHMENTS: R2Bucket;
    SEND_EMAIL: SendEmail;
    ASSETS: Fetcher;
    BOARD_INBOX_FORWARD?: string;
    VAPID_PUBLIC_KEY?: string;
    VAPID_SUBJECT?: string;
    BOARD_ALLOWLIST?: string;
    BOARD_CRON_SECRET?: string;
    BOARD_INBOUND_WEBHOOK_SECRET?: string;
    BOARD_PRESIDENT_ALLOWLIST?: string;
    BOARD_SESSION_SECRET?: string;
    BOARD_STORE_WEBHOOK_SECRET?: string;
    VAPID_PRIVATE_KEY?: string;
  }
}

type CloudflareEnv = Cloudflare.Env;

declare module "cloudflare:workers" {
  export const env: Cloudflare.Env;
}

declare module "vinext/server/fetch-handler" {
  const handler: ExportedHandler<Cloudflare.Env>;
  export default handler;
}
