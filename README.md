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

```sh
npm run preview    # build + local workerd preview
npm run deploy     # build + deploy to Cloudflare
```

Config lives in `wrangler.jsonc` and `open-next.config.ts`. Cloudflare Workers
Builds pins npm 10.9.2 — regenerate the lockfile with that version if CI errors
on lockfile mismatch.

## Still needed before go-live

Several live pages embed opaque Google widgets whose targets weren't scrapable.
Wire the real URLs into `src/lib/embeds.ts`: ticketing/RSVP, sponsorship
purchase, tournament + 5K registrations, survey, newsletter, donation, request
for support, and the photo-gallery albums. Also re-host the Google Drive flyers
(softball, golf, fundraising) and the Chapter Vision doc as local assets.
