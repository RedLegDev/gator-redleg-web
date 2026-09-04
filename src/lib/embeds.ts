/**
 * External / embedded URLs.
 *
 * Fill in the `null` values below with the real URLs (Stripe donation link,
 * ticketing, etc.) and the pages wire up automatically.
 */

export const EMBEDS = {
  // Store registration (event still draft/provisional — link is fine; no "Buy" copy).
  ballRsvp:
    "https://store.gatorredleg.org/events/st-barbaras-ball-2026/register" as string | null,

  // Support
  donate: "https://store.gatorredleg.org/donate" as string | null,

  // Chapter Vision doc — published-to-web embed URL (File → Share → Publish to web)
  chapterVisionDoc:
    "https://docs.google.com/document/d/e/2PACX-1vS79gIlTTQ4ce-5cXpsJZuKdx3fu0p67Fi-LCMRXJY5HQrYwaC-tfTr_dv7oPb0jHY2GQNj0oYQLdhz/pub?embedded=true",

  // Membership (known). USFAA owns pricing/enrollment — always link out, never reprint.
  usfaaJoin: "https://www.fieldartillery.org/membership-information",
  usfaaInfo: "https://www.fieldartillery.org",
  usfaaNewMemberships: "https://www.fieldartillery.org/membership-information",
} as const;

export const CHARITIES = [
  { name: "OCN Stand Down", href: "https://www.ocnstanddown.org/" },
  { name: "Wounded Warrior Project", href: "https://www.woundedwarriorproject.org/" },
  { name: "Heroes on the Water", href: "https://heroesonthewater.org/" },
  // Formerly "Tampa Warriors" — merged with the Tampa Bay Lightning in 2023 to
  // become the Lightning Warriors. The old tampawarriors.com domain lapsed and
  // is now a squatter; do not restore it.
  { name: "Lightning Warriors", href: "https://www.lightningwarriorshockey.org/" },
];

export const REDLEG_DEV_URL = "https://redleg.dev";
