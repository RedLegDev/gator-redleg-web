/**
 * Single source of truth for the site's navigation and URL structure.
 *
 * URL parity note: the live Google Sites uses the misspelled base
 * `/chapter-activites`. We adopt the corrected `/chapter-activities` as
 * canonical and 301-redirect every old path (see next.config.ts) so no
 * inbound link breaks. Likewise the live home lives at `/home`; we serve it
 * at `/` and redirect `/home` -> `/`.
 */

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavGroup = {
  label: string;
  href: string;
  children?: NavLink[];
};

export const FACEBOOK_URL =
  "https://m.facebook.com/pages/Gator-Redleg-Chapter-of-US-Field-Artillery-Association/159706074074450";
export const BASECAMP_URL = "https://3.basecamp.com";
export const CHARITABLE_PLAYBOOK_URL =
  "https://public.3.basecamp.com/p/YbEuXeM3TAKJnusdghRspEvs";
export const ZOOM_PATH = "/zoom";

export const NAV: NavGroup[] = [
  { label: "Home", href: "/" },
  {
    label: "History",
    href: "/history",
    children: [
      { label: "The Legend of St. Barbara", href: "/history/the-legend-of-st-barbara" },
      { label: "The Story of Molly Pitcher", href: "/history/the-story-of-molly-pitcher" },
      { label: "Fiddler's Green", href: "/history/fiddlers-green" },
    ],
  },
  {
    label: "About",
    href: "/chapter-vision",
    children: [
      { label: "Chapter Vision", href: "/chapter-vision" },
      { label: "Regimental Coin", href: "/regimental-coin" },
    ],
  },
  {
    label: "Chapter Activities",
    href: "/chapter-activities",
    children: [
      { label: "St. Barbara's Ball", href: "/chapter-activities/st-barbaras-ball" },
      { label: "Softball Tournament", href: "/chapter-activities/softball-tournament" },
      { label: "Golf Tournament", href: "/chapter-activities/golf-tournament" },
      { label: "5K Run", href: "/chapter-activities/5k-run" },
    ],
  },
  {
    label: "Support",
    href: "/support",
    children: [
      { label: "Fundraising", href: "/support/fundraising" },
      { label: "Volunteering", href: "/volunteering" },
      { label: "Charitable Action Playbook", href: CHARITABLE_PLAYBOOK_URL, external: true },
      { label: "Request for Support", href: "/support/request-for-support" },
    ],
  },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Membership", href: "/membership" },
  { label: "Contact", href: "/contact" },
];

/** St. Barbara's Ball has its own second-level nav on the live site. */
export const ST_BARBARAS_BALL_NAV: NavLink[] = [
  { label: "RSVP", href: "/chapter-activities/st-barbaras-ball/rsvp" },
  { label: "Sponsors", href: "/chapter-activities/st-barbaras-ball/sponsors" },
  { label: "FAQ", href: "/chapter-activities/st-barbaras-ball/faq" },
  { label: "Red Leg Social", href: "/chapter-activities/st-barbaras-ball/red-leg-social" },
];
