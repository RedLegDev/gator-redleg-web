# Board hub local development

## Secrets (`.dev.vars`)

```bash
BOARD_SESSION_SECRET=dev-only-change-me-32chars-min!!
```

Generate a production secret with `openssl rand -base64 32`.

Board roster lives in D1 (`members` table). After `db:migrate:local`, migration `0005_board_roster.sql` seeds the executive board. Legacy `BOARD_ALLOWLIST` / `BOARD_PRESIDENT_ALLOWLIST` wrangler secrets are only used to bootstrap D1 when the roster is empty.

## Database

```bash
npm run db:migrate:local    # first time + after new migrations
npm run db:migrate:remote   # production D1 (gator-board)
```

## Dev server

Port 3021 avoids Readerful PWA hijacking port 3000:

```bash
PORT=3021 npm run dev
```

Sign in: http://localhost:3021/board/login

Health check (needs D1 in dev): http://localhost:3021/api/board/health

## Cloudflare resources

| Resource | Name | ID |
|----------|------|-----|
| D1 | gator-board | `ff4b4f12-7552-40f4-a6fe-596a12fe0b75` |
| R2 | gator-board-attachments | (binding `ATTACHMENTS`) |

## Production secrets (Wrangler)

```bash
npx wrangler secret put BOARD_SESSION_SECRET
```

Optional legacy bootstrap (only if D1 roster is empty):

```bash
npx wrangler secret put BOARD_ALLOWLIST
npx wrangler secret put BOARD_PRESIDENT_ALLOWLIST
```

## People admin

Any active board member can manage roster at `/board/people` — add members, revoke access. All active members have the same permissions.

## Cron (due-soon reminders)

```bash
# Set once:
npx wrangler secret put BOARD_CRON_SECRET

# Daily (manual or CF cron hitting this route):
curl -X POST https://www.gatorredleg.org/api/board/cron/due-reminders \
  -H "Authorization: Bearer $BOARD_CRON_SECRET"
```

## Inbound email (Cloudflare Email Routing)

The worker entrypoint is `worker/index.ts` — it wraps OpenNext `fetch` and adds an `email()` handler for chapter mail.

**Flow:** MX → Email Routing rule → Worker `email()` → D1 archive (`inbound_emails`) + board message.

Optional wrangler var to forward a copy after posting:

```jsonc
"vars": { "BOARD_INBOX_FORWARD": "you@example.com" }
```

### Cutover (when ready)

1. Apply migration `0008_inbound_emails.sql` to remote D1
2. Deploy worker
3. Cloudflare dashboard → **Email Service → Routing** → create rule(s) → **Send to Worker** → `gator-redleg-web`
4. Start with one address (e.g. `president@gatorredleg.org`), verify board post, then expand
5. Remove `BOARD_CC` from contact/support forms once routing is live

### Local smoke test

```bash
npm run db:migrate:local
npm run preview          # terminal 1
npm run email:test       # terminal 2
```

Legacy HTTP webhook (optional): `POST /api/board/inbound-email` with `BOARD_INBOUND_WEBHOOK_SECRET`.

## Webhooks

| Route | Secret | Purpose |
|-------|--------|---------|
| `POST /api/board/internal/store-event` | `BOARD_STORE_WEBHOOK_SECRET` | Store events → board message |

## Basecamp import

```bash
npm run board:import -- --export
npm run board:import -- --dry-run
npm run board:import -- --commit --remote
```
