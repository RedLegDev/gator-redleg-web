import {
  buildPushPayload,
  type PushMessage,
  type PushSubscription,
  type VapidKeys,
} from "@block65/webcrypto-web-push";
import { newId, nowSec } from "./ids";

export type PushSubscriptionRow = {
  id: string;
  member_id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  user_agent: string | null;
  created_at: number;
  updated_at: number;
};

export type PushEnv = {
  VAPID_PUBLIC_KEY?: string;
  VAPID_PRIVATE_KEY?: string;
  VAPID_SUBJECT?: string;
  DB: D1Database;
};

function vapidKeys(env: PushEnv): VapidKeys | null {
  const publicKey = env.VAPID_PUBLIC_KEY?.trim();
  const privateKey = env.VAPID_PRIVATE_KEY?.trim();
  if (!publicKey || !privateKey) return null;
  return {
    subject: env.VAPID_SUBJECT?.trim() || "mailto:president@gatorredleg.org",
    publicKey,
    privateKey,
  };
}

export function getVapidPublicKey(env: PushEnv): string | null {
  const key = env.VAPID_PUBLIC_KEY?.trim();
  return key || null;
}

export async function upsertPushSubscription(
  db: D1Database,
  args: {
    memberId: string;
    endpoint: string;
    p256dh: string;
    auth: string;
    userAgent?: string;
  }
): Promise<PushSubscriptionRow> {
  const ts = nowSec();
  const existing = await db
    .prepare(`SELECT id FROM push_subscriptions WHERE endpoint = ?1`)
    .bind(args.endpoint)
    .first<{ id: string }>();

  if (existing) {
    await db
      .prepare(
        `UPDATE push_subscriptions
            SET member_id = ?2, p256dh = ?3, auth = ?4, user_agent = ?5, updated_at = ?6
          WHERE id = ?1`
      )
      .bind(
        existing.id,
        args.memberId,
        args.p256dh,
        args.auth,
        args.userAgent ?? null,
        ts
      )
      .run();
    return {
      id: existing.id,
      member_id: args.memberId,
      endpoint: args.endpoint,
      p256dh: args.p256dh,
      auth: args.auth,
      user_agent: args.userAgent ?? null,
      created_at: ts,
      updated_at: ts,
    };
  }

  const id = newId();
  await db
    .prepare(
      `INSERT INTO push_subscriptions
         (id, member_id, endpoint, p256dh, auth, user_agent, created_at, updated_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?7)`
    )
    .bind(
      id,
      args.memberId,
      args.endpoint,
      args.p256dh,
      args.auth,
      args.userAgent ?? null,
      ts
    )
    .run();

  return {
    id,
    member_id: args.memberId,
    endpoint: args.endpoint,
    p256dh: args.p256dh,
    auth: args.auth,
    user_agent: args.userAgent ?? null,
    created_at: ts,
    updated_at: ts,
  };
}

export async function deletePushSubscription(
  db: D1Database,
  memberId: string,
  endpoint: string
): Promise<boolean> {
  const result = await db
    .prepare(
      `DELETE FROM push_subscriptions WHERE member_id = ?1 AND endpoint = ?2`
    )
    .bind(memberId, endpoint)
    .run();
  return (result.meta.changes ?? 0) > 0;
}

export async function listPushSubscriptions(
  db: D1Database
): Promise<PushSubscriptionRow[]> {
  const { results } = await db
    .prepare(
      `SELECT s.id, s.member_id, s.endpoint, s.p256dh, s.auth, s.user_agent,
              s.created_at, s.updated_at
       FROM push_subscriptions s
       JOIN members m ON m.id = s.member_id
       WHERE m.status = 'active'`
    )
    .all<PushSubscriptionRow>();
  return results ?? [];
}

async function deleteByEndpoint(db: D1Database, endpoint: string): Promise<void> {
  await db
    .prepare(`DELETE FROM push_subscriptions WHERE endpoint = ?1`)
    .bind(endpoint)
    .run();
}

export async function fanOutInboundEmailPush(
  env: PushEnv,
  args: { subject: string; from: string; messageId: string }
): Promise<{ sent: number; pruned: number }> {
  const keys = vapidKeys(env);
  if (!keys) {
    console.warn("inbound push skipped: VAPID keys not configured");
    return { sent: 0, pruned: 0 };
  }

  const subs = await listPushSubscriptions(env.DB);
  if (subs.length === 0) return { sent: 0, pruned: 0 };

  const url = `https://www.gatorredleg.org/board/messages/${args.messageId}`;
  const message: PushMessage = {
    data: JSON.stringify({
      title: `[Email] ${args.subject}`,
      body: `From ${args.from}`,
      url,
    }),
    options: { ttl: 60 * 60 },
  };

  let sent = 0;
  let pruned = 0;

  await Promise.all(
    subs.map(async (row) => {
      const subscription: PushSubscription = {
        endpoint: row.endpoint,
        expirationTime: null,
        keys: { p256dh: row.p256dh, auth: row.auth },
      };
      try {
        const payload = await buildPushPayload(message, subscription, keys);
        const res = await fetch(row.endpoint, payload);
        if (res.status === 201 || res.status === 200) {
          sent += 1;
          return;
        }
        if (res.status === 404 || res.status === 410) {
          await deleteByEndpoint(env.DB, row.endpoint);
          pruned += 1;
          return;
        }
        console.warn("push send failed", res.status, row.endpoint.slice(0, 48));
      } catch (err) {
        console.error("push send error", err);
      }
    })
  );

  return { sent, pruned };
}
