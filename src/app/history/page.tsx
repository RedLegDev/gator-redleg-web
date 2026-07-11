import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Prose } from "@/components/Prose";
import { LinkCard } from "@/components/LinkCard";

export const metadata: Metadata = {
  title: "History",
  description:
    "The heritage of the 116th Field Artillery Regiment and the traditions of Florida's Redlegs.",
};

const SUBPAGES = [
  {
    label: "The Legend of St. Barbara",
    href: "/history/the-legend-of-st-barbara",
    blurb: "Patron saint of artillerymen, and protector against sudden death.",
  },
  {
    label: "The Story of Molly Pitcher",
    href: "/history/the-story-of-molly-pitcher",
    blurb: "The woman who manned the gun at the Battle of Monmouth.",
  },
  {
    label: "Fiddler's Green",
    href: "/history/fiddlers-green",
    blurb: "Where Redlegs muster after the last fire mission is complete.",
  },
];

export default function HistoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Heritage"
        title="A Proud Artillery Heritage"
        subtitle="Florida's Field Artillery has stood ready since the earliest days of the 116th."
      />
      <Container className="py-16">
        <Prose>
          <h2>The 116th Field Artillery Regiment</h2>
          <p>
            The 116th Field Artillery Regiment was originally organized during
            World War I at Camp Wheeler, Georgia, in October and November 1917
            as part of the 31st (Dixie) Division. The regiment was transported
            overseas but saw no combat, and was mustered from federal service on
            January 16, 1919.
          </p>
          <p>
            On December 5, 1921, Major Sumter L. Lowry Jr. of Tampa presented
            three batteries for federal recognition, forming the 1st Battalion,
            116th Field Artillery. Batteries A, B, and C were inspected and
            mustered by Lieutenant Colonel Vivian Collins, Adjutant General of
            Florida. Artillery has held a proud heritage in Florida ever since.
          </p>
          <p>
            Today the Gator Redleg Chapter carries those traditions forward in
            support of the Soldiers of the 2nd and 3rd Battalions, 116th Field
            Artillery.
          </p>
        </Prose>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SUBPAGES.map((p) => (
            <LinkCard
              key={p.href}
              href={p.href}
              title={p.label}
              blurb={p.blurb}
              cta="Read more"
            />
          ))}
        </div>
      </Container>
    </>
  );
}
