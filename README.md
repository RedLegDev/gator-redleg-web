# Gator Redleg Chapter — Website

Live site: [gatorredleg.org](https://www.gatorredleg.org/)

Next.js 15 (App Router) rebuild of the chapter site, replacing the old Google
Sites. Scarlet + gold Field Artillery branding. Deployed to Cloudflare Workers
via `@opennextjs/cloudflare`. **Push to `main` auto-deploys** via Cloudflare
Workers Builds.

Repo: `RedLegDev/gator-redleg-web`

## Stack

- **Next.js 15** App Router, React 19, TypeScript
- **Tailwind CSS v4** — brand tokens in `src/app/globals.css`
- **Fonts:** Cinzel (display), Oswald (labels/nav), Inter (body)
- **Cloudflare Workers** via `@opennextjs/cloudflare` (`wrangler.jsonc`)
- **Email:** Cloudflare Email Sending (`SEND_EMAIL` binding) for contact +
  support-request forms → `president@gatorredleg.org`
- **Payments / store:** link-out to [store.gatorredleg.org](https://store.gatorredleg.org)
  (Stripe) — donations live; ball ticketing opens later
- **Newsletter:** on-site signup → chapter listmonk
- **Analytics:** Plausible (`analytics.redleg.dev`)

## Develop

```sh
npm install
PORT=3021 npm run dev   # prefer 3021 — localhost:3000 may be hijacked by another app's SW
```

Do **not** run `npm run build` / `build:worker` while `npm run dev` is running —
the production build overwrites `.next` and breaks the dev server. Stop dev
first, and `rm -rf .next` before restarting after a worker build.

`account_id` is pinned in `wrangler.jsonc` so Email Sending / OpenNext remote
proxy resolve to the Red Leg Dev Cloudflare account non-interactively.

## Structure

- `src/app/**` — App Router pages + `/api/*` route handlers
- `src/components/**` — shared UI (`SiteHeader`, `SiteFooter`, `PageHero`,
  `Prose`, `MarkdownProse`, `LinkCard`, forms, etc.)
- `src/lib/nav.ts` — single source of truth for nav + URL structure
- `src/lib/embeds.ts` — external URLs (donate, USFAA membership, chapter vision
  embed). Prefer link-out over embedding for store/payment flows.
- `src/lib/chapter-docs.ts` — chapter markdown imports (bylaws, SOP, Bullard)
- `content/*.md` — governance / award markdown sources
- `public/photos/`, `public/docs/` — static assets (pre-optimize images before
  commit — `images.unoptimized` is on)

### Chapter markdown docs

Bylaws, SOP, and Bullard Award SOP live in `content/*.md` and are rendered via
`MarkdownProse`. They must be **bundled as raw string imports** through
`src/lib/chapter-docs.ts` (webpack `asset/source` + turbopack `raw-loader` in
`next.config.ts`). Do not `fs.readFileSync` at runtime — Cloudflare Workers
have no access to the repo `content/` tree, and those pages 500 in production
if loaded that way. Always verify the live Worker URL after deploy.

### Forms → email

Contact and Request for Support follow the same pattern: server-safe builders in
`src/lib/*`, client form component, `/api/*` route using `env.SEND_EMAIL.send`.
See `Areas/Gator Redlegs/Lessons.md` in the vault for the full convention.

## URL redirects

In `next.config.ts` (and mirrored where needed in Cloudflare):

- `/home` → `/`
- `/chapter-activites/*` → `/chapter-activities/*` (legacy misspelling)
- `/zoom` → chapter Zoom room
- Retired registration / survey / lodging subpaths → parent event pages

## Deploy

Local:

```sh
npm run preview    # build + local workerd preview
npm run deploy     # build + deploy from your machine
```

**Cloudflare Workers Builds** (CI on push to `main`):

- Build: `npm run build:worker` (`opennextjs-cloudflare build` → `.open-next/`)
- Deploy: `npx wrangler deploy`
- Config: `wrangler.jsonc`, `open-next.config.ts`

Custom domains: `gatorredleg.org` and `www.gatorredleg.org` (DNS on Cloudflare).

## What's live

- Membership page links out to USFAA (never reprint dues)
- Support request + contact forms (Cloudflare Email Sending)
- Newsletter signup
- Donations → `store.gatorredleg.org/donate`
- Chapter Vision, Bylaws (`/chapter-bylaws`), SOP (`/chapter-sop`), Bullard
  Award (`/bullard-award`), 501(c)(3) letter PDF
- History pages, chapter activities, fundraising / volunteering copy
- Charitable Action Playbook → on-site `/support/charitable-action-playbook`

## Still open / seasonal

- St. Barbara's Ball **RSVP / ticketing** (`EMBEDS.ballRsvp`) — opens late
  summer once 2026 Dining Out details are set; until then point people at the
  ball page / store as appropriate
- Tournament + 5K registration targets when those events are active again
