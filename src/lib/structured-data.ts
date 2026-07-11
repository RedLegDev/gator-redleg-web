/**
 * Structured-data (schema.org) definitions, kept in one place so the facts
 * (EIN, contacts, social profiles) have a single source of truth.
 *
 * Only asserts facts we can stand behind — no invented address, ratings, or
 * ticket prices. Ticketing schema is intentionally omitted until the 2026
 * Ball registration opens.
 */

const SITE = "https://www.gatorredleg.org";
const LOGO = `${SITE}/lovable-uploads/c4320cdb-23e3-429d-bdeb-cc34787d252c.png`;

const FACEBOOK =
  "https://m.facebook.com/pages/Gator-Redleg-Chapter-of-US-Field-Artillery-Association/159706074074450";
const STORE = "https://store.gatorredleg.org";

/** Node id so other schema blocks (events, etc.) can reference the org. */
export const ORG_ID = `${SITE}/#organization`;

export const organizationSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": ["NGO", "Organization"],
  "@id": ORG_ID,
  name: "Gator Redleg Chapter of the US Field Artillery Association",
  alternateName: "Gator Redlegs",
  url: SITE,
  logo: LOGO,
  image: `${SITE}/og-image.png`,
  description:
    "A 501(c)(3) non-profit professional association serving Florida's Field Artillery Soldiers, veterans, and their families in support of the 116th Field Artillery Regiment.",
  taxID: "82-4625785",
  nonprofitStatus: "Nonprofit501c3",
  email: "president@gatorredleg.org",
  areaServed: {
    "@type": "State",
    name: "Florida",
  },
  sameAs: [FACEBOOK, STORE],
};

export const stBarbarasBallEventSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "SocialEvent",
  name: "St. Barbara's Ball — Gator Redleg Dining Out",
  description:
    "The Gator Redleg Chapter's premier annual event — a formal Dining Out honoring Saint Barbara, patron saint of the Field Artillery, for Soldiers, veterans, families, and friends of the Regiment.",
  startDate: "2026-12-12",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  url: `${SITE}/chapter-activities/st-barbaras-ball`,
  image: `${SITE}/og-image.png`,
  location: {
    "@type": "Place",
    name: "Winter Haven Armory",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Winter Haven",
      addressRegion: "FL",
      addressCountry: "US",
    },
  },
  organizer: {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Gator Redleg Chapter of the US Field Artillery Association",
    url: SITE,
  },
};
