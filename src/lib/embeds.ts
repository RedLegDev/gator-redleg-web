/**
 * External / embedded URLs.
 *
 * Fill in the `null` values below with the real URLs (Stripe donation link,
 * ticketing, etc.) and the pages wire up automatically.
 */

export const EMBEDS = {
  // St. Barbara's Ball
  // RSVP/tickets and sponsorship route through the Stripe-backed store.
  ballRsvp: "https://store.gatorredleg.org" as string | null,
  ballSponsors: "https://store.gatorredleg.org" as string | null,
  // Known-good external links
  ballLodgingHotel: "https://hotel.hardrock.com/daytona-beach/",
  ballLodgingBooking:
    "https://be.synxis.com/?Hotel=78302&Chain=13924&Dest=HRH&config=RBEDB&theme=RBE&locale=en-US&arrive=2025-11-07&depart=2025-11-09&adult=1&child=0&group=2025BBNG",

  // Support
  donate: null as string | null, // Stripe donation link

  // Chapter Vision doc
  chapterVisionDoc:
    "https://docs.google.com/document/d/15CmyFuNwQ_mRUCtwE5GNw_unKccf6268Ua6k3B_1Qc8/edit?usp=sharing",

  // Membership (known)
  usfaaJoin: "https://www.fieldartillery.org/membership-information",
  usfaaInfo: "https://fieldartillery.org",
  usfaaNewMemberships: "https://fieldartillery.org/new-memberships/",
} as const;

export const CHARITIES = [
  { name: "OCN Stand Down", href: "https://www.ocnstanddown.org/" },
  { name: "Wounded Warrior Project", href: "https://www.woundedwarriorproject.org/" },
  { name: "Heroes on the Water", href: "https://heroesonthewater.org/" },
  { name: "Tampa Warriors", href: "https://tampawarriors.com/" },
];

export const REDLEG_DEV_URL = "https://redleg.dev";
