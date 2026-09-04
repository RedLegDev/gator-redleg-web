/**
 * Worker entry: OpenNext fetch handler + Cloudflare Email Routing inbound handler.
 */
import openNext from "../.open-next/worker.js";
export {
  DOQueueHandler,
  DOShardedTagCache,
  BucketCachePurge,
} from "../.open-next/worker.js";

import { onInboundEmail } from "./inbound-email";

const worker = {
  fetch: openNext.fetch,
  email: onInboundEmail,
};

export default worker;
