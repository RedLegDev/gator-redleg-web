/**
 * External / embedded URLs.
 *
 * Fill in the `null` values below with the real URLs (Stripe donation link,
 * ticketing, etc.) and the pages wire up automatically.
 */

export const EMBEDS = {
  // St. Barbara's Ball — 2026 ticketing not open yet (opens late summer).
  ballRsvp: null as string | null,

  // Support
  donate: null as string | null, // Stripe donation link

  // Chapter Vision doc
  chapterVisionDoc:
    "https://docs.google.com/document/d/15CmyFuNwQ_mRUCtwE5GNw_unKccf6268Ua6k3B_1Qc8/edit?usp=sharing",

  // Membership (known). USFAA owns pricing/enrollment — always link out, never reprint.
  usfaaJoin: "https://www.fieldartillery.org/membership-information",
  usfaaInfo: "https://www.fieldartillery.org",
  usfaaNewMemberships: "https://www.fieldartillery.org/membership-information",
} as const;

export const CHARITIES = [
  { name: "OCN Stand Down", href: "https://www.ocnstanddown.org/" },
  { name: "Wounded Warrior Project", href: "https://www.woundedwarriorproject.org/" },
  { name: "Heroes on the Water", href: "https://heroesonthewater.org/" },
  { name: "Tampa Warriors", href: "https://tampawarriors.com/" },
];

export const REDLEG_DEV_URL = "https://redleg.dev";
