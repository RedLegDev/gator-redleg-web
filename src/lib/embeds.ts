/**
 * External / embedded URLs.
 *
 * The live Google Sites embeds (RSVP, registrations, donation, forms, photo
 * albums) hide their real targets inside opaque Google wrapper iframes, so
 * those could not be scraped. Fill in the `null` values below with the real
 * QGiv / Google Form / Google Photos URLs and the pages wire up automatically.
 */

export const EMBEDS = {
  // St. Barbara's Ball
  // RSVP/tickets and sponsorship route through the Stripe-backed store.
  ballRsvp: "https://store.gatorredleg.org" as string | null,
  ballSponsors: "https://store.gatorredleg.org" as string | null,
  ballSurvey: null as string | null, // Google Form survey
  // Known-good external links
  ballLodgingHotel: "https://hotel.hardrock.com/daytona-beach/",
  ballLodgingBooking:
    "https://be.synxis.com/?Hotel=78302&Chain=13924&Dest=HRH&config=RBEDB&theme=RBE&locale=en-US&arrive=2025-11-07&depart=2025-11-09&adult=1&child=0&group=2025BBNG",

  // Tournament registrations
  softballRegistration: null as string | null,
  golfRegistration: null as string | null,
  runRegistration: null as string | null,

  // Support
  donate: null as string | null, // QGiv donation
  newsletterSignup: null as string | null,

  // Chapter Vision doc
  chapterVisionDoc:
    "https://docs.google.com/document/d/15CmyFuNwQ_mRUCtwE5GNw_unKccf6268Ua6k3B_1Qc8/edit?usp=sharing",

  // Membership (known)
  usfaaJoin: "https://www.fieldartillery.org/membership-information",
  usfaaInfo: "https://fieldartillery.org",
  usfaaNewMemberships: "https://fieldartillery.org/new-memberships/",

  // Photo galleries (Google Photos albums)
  photos2022Ball: null as string | null,
  photos2020Ball: null as string | null,
  photos2019Ball: null as string | null,
  photos2019Social: null as string | null,
} as const;

export const CHARITIES = [
  { name: "OCN Stand Down", href: "https://www.ocnstanddown.org/" },
  { name: "Wounded Warrior Project", href: "https://www.woundedwarriorproject.org/" },
  { name: "Heroes on the Water", href: "https://heroesonthewater.org/" },
  { name: "Tampa Warriors", href: "https://tampawarriors.com/" },
];

export const REDLEG_DEV_URL = "https://redleg.dev";
