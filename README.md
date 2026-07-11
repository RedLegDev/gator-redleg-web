# Gator Redleg Chapter — Website

Next.js 15 (App Router) rebuild of [gatorredleg.org](https://www.gatorredleg.org/),
replacing the previous Google Sites site. Scarlet + gold Field Artillery branding,
deployed to Cloudflare Workers via `@opennextjs/cloudflare`.

## Stack

- **Next.js 15** App Router, React 19, TypeScript
- **Tailwind CSS v4** — brand tokens in `src/app/globals.css`
- **Fonts:** Cinzel (inscriptional display), Oswald (labels/nav), Inter (body)
- **Cloudflare Workers** via `@opennextjs/cloudflare`
- **Analytics:** Plausible (`analytics.redleg.dev`)

## Develop

```sh
npm install
npm run dev        # http://localhost:3000
```

> Do **not** run `npm run build` while `npm run dev` is running — the production
> build overwrites `.next` and breaks the dev server. Stop dev first.

## Structure

- `src/app/**` — one folder per route; URLs mirror the live site for parity
- `src/components/**` — `SiteHeader`, `SiteFooter`, `PageHero`, `Prose`,
  `SubNav`, `AzimuthRule`, `Button`, `EmbedSlot`, `Container`
- `src/lib/nav.ts` — single source of truth for nav + URL structure
- `src/lib/embeds.ts` — external / embedded URLs (QGiv, Google Forms, Photos).
  **Fill in the `null` values** with the real form/donation/album URLs.

## URL parity

Routes mirror the live Google Sites paths. Redirects in `next.config.ts`:

- `/home` → `/`
- `/chapter-activites/*` → `/chapter-activities/*` (fixes the live site's
  misspelled Softball registration link)
- `/zoom` → the chapter Zoom room

## Deploy (Cloudflare Workers)

Local:

```sh
npm run preview    # build + local workerd preview
npm run deploy     # build + deploy from your machine
```

**Cloudflare Workers Builds** (CI on push): set the build command to
`npm run build:worker` (runs `opennextjs-cloudflare build` → `.open-next/`) and
the deploy command to `npx wrangler deploy`. Config lives in `wrangler.jsonc`
and `open-next.config.ts`. The lockfile is generated with npm 10.9.2 to match
Workers Builds.

## Wired up

- **Request for Support** — native form (`SupportRequestForm`) posting to the
  existing Make.com webhook with the same HTML-email payload.
- **Fundraising** — reproduced from the 2024 flyer.
- **Chapter Vision** — links to the Google Doc.
- **RSVP / Sponsors** — route to `store.gatorredleg.org` (Stripe flow).
- **Charitable Action Playbook** — links to the public Basecamp doc.

## Still needed before go-live

Wire the remaining `null` values in `src/lib/embeds.ts`:

- Ball **survey** (Google Form) and **newsletter** signup
- **Donation** link (QGiv / Stripe)
- The four **photo-gallery** albums
- Tournament + 5K **registration** targets (or point at store products)
- Optionally: specific store **product URLs** for ball tickets (currently the
  store homepage), and re-host the softball/golf flyer PDFs as local assets.
