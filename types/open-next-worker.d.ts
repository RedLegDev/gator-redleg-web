/** Stub for OpenNext output — exists on disk only after `opennextjs-cloudflare build`. */
declare module "../.open-next/worker.js" {
  const openNext: {
    fetch: NonNullable<ExportedHandler<CloudflareEnv>["fetch"]>;
  };
  export default openNext;
  export class DOQueueHandler {}
  export class DOShardedTagCache {}
  export class BucketCachePurge {}
}
