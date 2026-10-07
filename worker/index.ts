/**
 * Worker entry: vinext fetch handler + Cloudflare Email Routing inbound handler.
 */
import handler from "vinext/server/fetch-handler";
import { onInboundEmail } from "./inbound-email";

const worker = {
  ...handler,
  email: onInboundEmail,
};

export default worker;
