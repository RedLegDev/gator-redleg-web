/// <reference path="../cloudflare-env.d.ts" />

declare interface CloudflareEnv {
  BOARD_INBOX_FORWARD?: string;
  VAPID_PUBLIC_KEY?: string;
  VAPID_PRIVATE_KEY?: string;
  VAPID_SUBJECT?: string;
}
