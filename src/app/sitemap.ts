import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://www.gatorredleg.org";

/**
 * Static route inventory for the sitemap. Kept as an explicit list (rather
 * than crawling the filesystem) so it works under the Cloudflare static
 * export. `/zoom` is a redirect and is intentionally omitted.
 *
 * priority tiers: home 1.0 · top-level sections 0.8 · leaf pages 0.6
 */
const ROUTES: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1.0 },
  { path: "/history", priority: 0.8 },
  { path: "/history/the-legend-of-st-barbara", priority: 0.6 },
  { path: "/history/the-story-of-molly-pitcher", priority: 0.6 },
  { path: "/history/fiddlers-green", priority: 0.6 },
  { path: "/regimental-coin", priority: 0.6 },
  { path: "/chapter-activities", priority: 0.8 },
  { path: "/chapter-activities/st-barbaras-ball", priority: 0.8 },
  { path: "/chapter-activities/st-barbaras-ball/faq", priority: 0.6 },
  { path: "/chapter-activities/st-barbaras-ball/rsvp", priority: 0.6 },
  { path: "/chapter-activities/st-barbaras-ball/sponsors", priority: 0.6 },
  { path: "/chapter-activities/st-barbaras-ball/red-leg-social", priority: 0.6 },
  { path: "/chapter-activities/softball-tournament", priority: 0.6 },
  { path: "/chapter-activities/golf-tournament", priority: 0.6 },
  { path: "/chapter-activities/5k-run", priority: 0.6 },
  { path: "/newsletter", priority: 0.6 },
  { path: "/support", priority: 0.8 },
  { path: "/support/fundraising", priority: 0.6 },
  { path: "/support/request-for-support", priority: 0.6 },
  { path: "/membership", priority: 0.8 },
  { path: "/volunteering", priority: 0.6 },
  { path: "/chapter-vision", priority: 0.6 },
  { path: "/contact", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
