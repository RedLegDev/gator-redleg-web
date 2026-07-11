import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Prose } from "@/components/Prose";

export const metadata: Metadata = {
  title: "Fundraising",
  description:
    "Fundraising and donation opportunities supporting the Gator Redleg Chapter's mission.",
};

const PILLARS = [
  {
    h: "Community",
    p: 'A support network for our veterans, military, and families in times of emotional distress or financial hardship — so we truly "Never Leave a Fallen Comrade."',
  },
  {
    h: "Activities",
    p: "Meaningful activities that preserve and strengthen the bonds of camaraderie between Artillerists past and present.",
  },
  {
    h: "Support",
    p: "An avenue for local governments, businesses, and charities to express their support for our hometown heroes.",
  },
];

const EXAMPLES = [
  "Event tickets or ticket packages",
  "Gift cards",
  "Retail items that can be raffled off individually",
  "A collection of retail items bundled into a themed basket and raffled off",
];

export default function FundraisingPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Fundraising Opportunities"
        subtitle="Partner with the Gator Redlegs to support Florida's Field Artillery Soldiers, veterans, and their families."
      />
      <Container className="py-16">
        <Prose>
          <h2>Who Are We?</h2>
          <p>
            The Gator Redleg Chapter of the USFAA is a 501(c)(3) non-profit
            professional association serving Florida&apos;s Field Artillery
            Soldiers, veterans, and their families. As a professional
            association, the Chapter promotes the efficiency of the Field
            Artillery by maintaining its best traditions and perpetuating the
            memory and history of our fallen. As a non-profit, we support
            Soldiers through family scholarships and contributions to charities
            serving the veteran community.
          </p>
          <p>
            Recent support to Redlegs (2023–2024): the chapter has provided
            emergency financial support to Gator Redlegs in need, supported
            Redleg community events tied to the Regiment&apos;s significant
            training events, and supported the local Wreaths Across America at
            the Florida National Cemetery.
          </p>
        </Prose>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.h} className="border-t-4 border-gold pt-4">
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-redleg">
                {p.h}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-artillery-light">
                {p.p}
              </p>
            </div>
          ))}
        </div>

        <Prose className="mt-12">
          <h2>What Are We Requesting?</h2>
          <p>
            All donations go to the Gator Redleg Chapter for use during chapter
            events and to support our efforts in the community. We seek both{" "}
            <strong>monetary</strong> and <strong>in-kind</strong> donations.
            In-kind donations help us build fundraising baskets raffled off
            during our annual St. Barbara&apos;s Ball. Monetary donations go
            directly to chapter efforts that support our community; in-kind
            donations support chapter events or go directly to chapter members
            in need.
          </p>
          <h3>Recommended Examples</h3>
          <ul>
            {EXAMPLES.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </Prose>

        <div className="mt-10 max-w-3xl rounded border-l-4 border-redleg bg-neutral-50 p-6 text-sm leading-relaxed text-artillery-light">
          <p>
            All checks should be made out to the{" "}
            <strong>&ldquo;Gator Redleg Association, Inc.&rdquo;</strong> Credit
            card payment information can be provided by request from the
            Treasurer or Secretary. Donation collectors not directly assigned to
            a battalion may state which battalion they are affiliated with.
          </p>
          <p className="mt-3">
            Questions? Email{" "}
            <a
              href="mailto:secretary@gatorredleg.org"
              className="font-semibold text-redleg underline"
            >
              secretary@gatorredleg.org
            </a>
            .
          </p>
        </div>
      </Container>
    </>
  );
}
