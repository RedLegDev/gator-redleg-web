# ADR-001: Board Hub Architecture

**Status:** Proposed  
**Date:** 2026-09-03  
**Plan ID:** BH-02  
**Deciders:** Chapter president (sign-off pending)

## Context

The Gator Redleg Chapter uses Basecamp (project `30371149`) for board coordination — primarily message board threads and to-do lists. Basecamp will be deprecated within the next few months. We will replace it with a member-gated **board hub** inside `gator-redleg-web` on Cloudflare Workers, reusing patterns from `gator-redleg-store` and shared mail infrastructure per [#12](https://github.com/RedLegDev/gator-redleg-web/issues/12).

See [basecamp-inventory.md](./basecamp-inventory.md) for feature audit.

## Decision

Build the board hub as **`/board/*` routes in `gator-redleg-web`** with:

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Compute | Cloudflare Workers via `@opennextjs/cloudflare` | Same as public site; one deploy pipeline |
| Database | D1 (`gator-board`) | Relational fit for threads, tasks, assignments; proven in store |
| Attachments | R2 (`gator-board-attachments`) | Message images; optional P2 |
| Auth | Magic-link + HMAC cookie (`rl_board`) | Port from store; roster in D1 `members` |
| Auth boundary | Per-route `requireMember()` | Match store — no middleware |
| Outbound email | `SEND_EMAIL` on site worker | Already works; notifications, magic links |
| Inbound email | **SaaSMail webhook** (after #12) | Do not add `email()` handler to site worker |
| Real-time chat | **Not in v1** | Message comments + email notifications suffice |

## Route structure

```
/board/login              POST email → magic link
/board/verify             token → session cookie
/board                      dashboard (activity feed — post-MVP #33)
/board/messages             list (pinned first)
/board/messages/new         compose
/board/messages/[id]        thread + comments
/board/tasks                todo list index
/board/tasks/[listId]       checklist
/board/me                   my assigned open tasks
```

## Data model (summary)

### Foundation (`0001_board_hub.sql`)

- `members` — allowlist + profile (email, name, role)
- `login_tokens` — magic-link hashes (port store pattern)
- `comments` — polymorphic (`parent_type`: `message` | `task`)
- `activity` — denormalized feed for dashboard
- `notification_prefs` — per-member email toggles

### Messages (`0002_board_messages.sql`)

- `messages` — subject, body_md, author_id, pinned, status
- `message_subscriptions` — optional v1.1

### Tasks (`0003_board_tasks.sql`)

- `task_lists` — name, position
- `tasks` — title, assignee_id, due_date, completed_at, position

## Email architecture

```
OUTBOUND (now)
  gator-redleg-web SEND_EMAIL
    → noreply@ / board@ → members
    → magic links, @mentions, assignment alerts

INBOUND (after #12)
  Internet → CF Email Routing → saasmail-redleg
    → D1 storage + SaaSMail UI (president@)
    → webhook → POST /api/board/inbound-email → board message

INTERIM (before #12)
  CF Email Routing → forward to Fastmail
  Board hub: UI only; no email read
```

**Do not** build a fourth mail stack. **Do not** wait on #12 for board MVP.

## Auth secrets (Wrangler)

| Secret | Purpose |
|--------|---------|
| `BOARD_SESSION_SECRET` | HMAC session cookie |
| `BOARD_ALLOWLIST` | *(legacy)* Bootstrap D1 roster when empty |
| `BOARD_PRESIDENT_ALLOWLIST` | *(legacy)* President role during bootstrap |
| `BOARD_INBOUND_WEBHOOK_SECRET` | Verify SaaSMail signatures (#31) |

Active members, roles, and revoke are stored in D1. Any active member can manage roster at `/board/people`. Role labels (president/officer/member) are organizational metadata, not permission gates.

## Won't do in v1

- Real-time chat / Campfire replacement
- Schedule / calendar
- Docs & Files vault UI
- Kanban cards
- Check-ins
- Full-text search (#35 post-MVP)
- President draft→publish (#34 post-MVP)

## Consequences

### Positive

- Single repo, single deploy, chapter branding consistent
- Reuses store auth/D1 patterns — lower implementation risk
- Outbound mail works today without SaaSMail
- Basecamp import can preserve timestamps and list structure

### Negative

- D1 + auth adds dynamic routes — `force-dynamic` on `/board/*`
- `.mil` email deliverability remains unreliable for magic links — allow personal emails
- DMARC `p=reject` on gatorredleg.org — test before notification blast
- Inbound email automation blocked until #12 lands

### Risks

| Risk | Mitigation |
|------|------------|
| Board adoption | Parallel run (#30); import history |
| Scope creep | This ADR + inventory doc lock v1 |
| Email DNS | #12 parallel track; cf-bounce already published |
| Attachment migration | P2; link Basecamp archive for old files |

## Alternatives considered

### Separate repo or subdomain (`board.gatorredleg.org`)

Rejected — unnecessary ops overhead for ~10 users; same Worker can gate `/board/*`.

### Clerk / Auth.js

Rejected — cost and complexity for fixed small allowlist.

### Build inbox Worker on gator-redleg-web

Rejected — duplicates saasmail-redleg; same guidance as 29divarty-web#20.

### Embed Basecamp iframe

Rejected — doesn't solve deprecation or cost.

## Implementation sequence

1. Foundation (#16–#19) — D1, auth, layout
2. Messages (#20–#24) — core coordination
3. Tasks (#25–#28) — St. Barbara's 2026 workload
4. Import + parallel run (#29–#30)
5. #12 (parallel) — SaaSMail onboarding
6. Inbound webhook (#31) — after #12
7. Decommission (#32)

## References

- [basecamp-inventory.md](./basecamp-inventory.md)
- Epic [#37](https://github.com/RedLegDev/gator-redleg-web/issues/37)
- Store auth: `gator-redleg-store/app/lib/events/auth.ts`
- SaaSMail webhook: `saasmail/worker/src/lib/webhook-delivery.ts`
