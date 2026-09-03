# Board hub local development

## Secrets (`.dev.vars`)

```bash
BOARD_SESSION_SECRET=dev-only-change-me-32chars-min!!
BOARD_ALLOWLIST=you@example.com
```

Generate a production secret with `openssl rand -base64 32`.

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
npx wrangler secret put BOARD_ALLOWLIST
npx wrangler secret put BOARD_PRESIDENT_ALLOWLIST
```

President allowlist emails get `role=president` (pin messages). Comma-separated, same format as `BOARD_ALLOWLIST`.

## Basecamp import

```bash
npm run board:import -- --export
npm run board:import -- --dry-run
npm run board:import -- --commit --remote
```
