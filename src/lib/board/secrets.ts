import { getCloudflareContext } from "@opennextjs/cloudflare";

export type BoardSecretName =
  | "BOARD_SESSION_SECRET"
  | "BOARD_ALLOWLIST"
  | "BOARD_PRESIDENT_ALLOWLIST"
  | "BOARD_INBOUND_WEBHOOK_SECRET";

export function secret(name: BoardSecretName): string | undefined {
  try {
    const env = getCloudflareContext().env as unknown as Record<
      string,
      unknown
    >;
    const value = env[name];
    if (typeof value === "string" && value.length > 0) return value;
  } catch {
    // Outside request scope during static analysis.
  }

  const value = process.env[name];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export function getDb(): D1Database {
  return getCloudflareContext().env.DB;
}
