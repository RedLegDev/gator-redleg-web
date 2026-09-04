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

## Webhooks (when configured)

| Route | Secret | Purpose |
|-------|--------|---------|
| `POST /api/board/inbound-email` | `BOARD_INBOUND_WEBHOOK_SECRET` | SaaSMail → board message (#12) |
| `POST /api/board/internal/store-event` | `BOARD_STORE_WEBHOOK_SECRET` | Store events → board message |

## Basecamp import

```bash
npm run board:import -- --export
npm run board:import -- --dry-run
npm run board:import -- --commit --remote
```
