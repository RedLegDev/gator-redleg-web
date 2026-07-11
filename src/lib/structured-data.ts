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

/**
 * FAQ schema for the St. Barbara's Ball FAQ page. Each answer is a faithful
 * condensation of the visible on-page content (a schema requirement — the
 * markup must reflect what a visitor actually sees).
 */
export const ballFaqSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a “Dining Out”?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A dining-out is a formal military dinner with strict rules of conduct, presided over by Mr. President and Mr. Vice. It is identical to a dining-in except that spouses and guests are included. It gathers Redlegs together socially and builds on the camaraderie of the unit.",
      },
    },
    {
      "@type": "Question",
      name: "What is the attire for the 2026 St. Barbara's Ball?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For the 2026 Dining Out the dress is cocktail attire, and Soldiers are encouraged to attend in uniform. A traditional Saint Barbara's dining-in or dining-out is a formal (bow tie / mess uniform, tuxedo or gown) affair; the 2026 event is more relaxed.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Grog Ceremony?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Grog Ceremony is a St. Barbara's Day tradition honoring new gunners as they join the Field Artillery. Charges of champagne, corn squeezin's and Scotch, cognac, and blended bourbon are mixed into the Field Artillery Punch, culminating in a red elixir symbolizing the blood of those who sacrificed for freedom.",
      },
    },
    {
      "@type": "Question",
      name: "What are the Order of Saint Barbara and the Molly Pitcher Award?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Order of Saint Barbara, awarded through the USFAA and ADAA, has two levels: the Honorable Order for outstanding professional competence and selfless service to the Artillery, and the Ancient Order for long-term exceptional service. The Honorable Order of Molly Pitcher recognizes military spouses who have significantly contributed to the Field Artillery or Air Defense Artillery communities.",
      },
    },
  ],
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
