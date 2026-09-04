import { getCloudflareContext } from "@opennextjs/cloudflare";

export function boardParallelRunActive(): boolean {
  try {
    const env = getCloudflareContext().env as unknown as Record<string, unknown>;
    return env.BOARD_PARALLEL_RUN === "true" || env.BOARD_PARALLEL_RUN === true;
  } catch {
    return process.env.BOARD_PARALLEL_RUN === "true";
  }
}
