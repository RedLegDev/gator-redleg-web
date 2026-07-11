import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Volunteering",
  description:
    "Lend a hand to the Gator Redleg Chapter — event support, care packages for deployed Soldiers, membership outreach, committee service, and skilled trades.",
};

type Opportunity = {
  title: string;
  blurb: string;
};

const OPPORTUNITIES: Opportunity[] = [
  {
    title: "Event Support",
    blurb:
      "Our fundraisers only run because Redlegs show up to run them. Help with setup, registration, day-of coordination, and teardown for St. Barbara's Ball, the Kenny Fike Memorial Softball Tournament, the golf tournament, and the 5K Fun Run.",
  },
  {
    title: "Care Packages for Deployed Soldiers",
    blurb:
      "With both battalions deploying or preparing to, keeping our Soldiers connected to home matters more than ever. Help assemble, fund, and ship care packages to Redlegs down range.",
  },
  {
    title: "Membership & Outreach",
    blurb:
      "Run a chapter table at unit family days, employer days, and recruiting events. A few hours staffing a booth grows our ranks and introduces future members, families, and donors to the chapter.",
  },
  {
    title: "Committee & Board Service",
    blurb:
      "Take a standing role in planning an event or steering the chapter. We are an all-volunteer board, and committee members and future officers keep the chapter strong through deployments and transitions.",
  },
  {
    title: "Fundraising & Sponsorship",
    blurb:
      "Help line up sponsors, gather silent-auction donations, and drive campaigns like the restoration of the regiment's WWI–WWII era colors. If you have contacts or a knack for the ask, we need you.",
  },
  {
    title: "Lend a Professional Skill",
    blurb:
      "Photographers, writers, designers, and social-media hands: help us document events, produce the newsletter, and tell the chapter's story. Pro-bono professional support is always welcome.",
  },
];

export default function VolunteeringPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Volunteer With the Gator Redlegs"
        subtitle="Everything this chapter does — every event, every care package, every scholarship — runs on Redlegs who give their time. There is a place for you."
      />
      <Container className="py-16">
        <div className="max-w-3xl">
          <p className="leading-relaxed text-artillery-light">
            The Gator Redleg Chapter is entirely volunteer-run. With both the
            2-116th and 3-116th Field Artillery in or preparing for deployment,
            hands are stretched thin and the need for volunteers has never been
            greater. Whether you can give a single afternoon at an event or take
            on a standing role, your time keeps Florida&apos;s Field Artillery
            community strong. You do not need to be a USFAA member to pitch in —
            Soldiers, veterans, family members, and friends of the regiment are
            all welcome.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="font-display text-2xl font-bold tracking-wide text-artillery">
            Ways to Pitch In
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {OPPORTUNITIES.map((o) => (
              <div
                key={o.title}
                className="flex h-full flex-col border-t-2 border-redleg bg-white p-6 shadow-[0_1px_2px_rgba(20,20,20,0.06)] ring-1 ring-black/5"
              >
                <h3 className="font-heading text-xl font-semibold leading-tight text-artillery">
                  {o.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-artillery-light">
                  {o.blurb}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 max-w-3xl rounded border-l-4 border-gold bg-amber-50/60 p-6">
          <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-redleg">
            Ready to Serve?
          </h2>
          <p className="mt-2 leading-relaxed text-artillery-light">
            Tell us how you&apos;d like to help and we&apos;ll connect you with
            the right effort. Reach out through our{" "}
            <a
              href="/contact"
              className="font-semibold text-redleg underline underline-offset-2 hover:text-redleg-dark"
            >
              contact form
            </a>{" "}
            or email{" "}
            <a
              href="mailto:president@gatorredleg.org"
              className="font-semibold text-redleg underline underline-offset-2 hover:text-redleg-dark"
            >
              president@gatorredleg.org
            </a>
            . Not sure where you fit yet? Join our mailing list and we&apos;ll
            let you know when volunteer calls go out.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href="/contact">Volunteer With Us</Button>
            <Button href="/newsletter" variant="secondary">
              Join the Mailing List
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
