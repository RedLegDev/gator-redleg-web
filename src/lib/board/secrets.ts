import { env } from "cloudflare:workers";

export type BoardSecretName =
  | "BOARD_SESSION_SECRET"
  | "BOARD_ALLOWLIST" // legacy bootstrap when D1 roster is empty
  | "BOARD_PRESIDENT_ALLOWLIST" // legacy bootstrap
  | "BOARD_INBOUND_WEBHOOK_SECRET"
  | "BOARD_STORE_WEBHOOK_SECRET"
  | "BOARD_CRON_SECRET";

export function secret(name: BoardSecretName): string | undefined {
  try {
    const value = env[name];
    if (typeof value === "string" && value.length > 0) return value;
  } catch {
    // cloudflare:workers env can throw outside a request scope. Fall through.
  }

  const value = process.env[name];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export function getDb(): D1Database {
  return env.DB;
}

export function getAttachmentsBucket(): R2Bucket {
  return env.ATTACHMENTS;
}
