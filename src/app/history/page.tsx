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

          <h2>World War II and the Dixie Division</h2>
          <p>
            Reorganized between the wars, the 116th Field Artillery again
            answered the call in World War II as part of the 31st Infantry
            Division &mdash; the &ldquo;Dixie Division.&rdquo; The unit served
            in the Pacific theater, earning campaign credit for the New Guinea
            and Southern Philippines campaigns, with the New Guinea streamer
            carrying an arrowhead device for its assault landing. For its part
            in the liberation of the Philippines, the regiment shared in the
            award of the Philippine Presidential Unit Citation. The 116th Field
            Artillery Battalion was inactivated on December 20, 1945, at Camp
            Stoneman, California, and relieved from the 31st Infantry Division
            the following year.
          </p>

          <h2>Cold War Reorganizations</h2>
          <p>
            Like most of the Army&rsquo;s field artillery, the 116th was
            reshaped repeatedly in the decades after the war. The battalion was
            consolidated in 1946, reorganized in 1955 as the 149th Armored Field
            Artillery Battalion, and in 1959 consolidated once more to form the
            116th Artillery as a parent regiment under the Combat Arms Regimental
            System. Through each redesignation the guns stayed in Florida hands,
            crewed by Guardsmen from the same central-Florida communities that
            had raised the original batteries.
          </p>

          <h2>The Modern Battalions</h2>
          <p>
            In 1993 the regiment was reorganized into the structure Floridians
            know today: the 2nd Battalion, 116th Field Artillery, and the 3rd
            Battalion, 116th Field Artillery. The 2nd Battalion, headquartered at
            the Lakeland Armory, serves as the fires battalion of the Florida
            Army National Guard&rsquo;s 53rd Infantry Brigade Combat Team. The
            3rd Battalion operates the M142 High Mobility Artillery Rocket System
            (HIMARS){/* TODO VERIFY: current 3-116 higher headquarters. Wikipedia lists 164th Air Defense Artillery Brigade; confirm before publishing. */},
            keeping the regiment&rsquo;s rockets and cannon rooted in the Tampa,
            Lakeland, Winter Haven, and surrounding communities that have filled
            its ranks for a century.
          </p>

          <h2>The War on Terror</h2>
          <p>
            The regiment&rsquo;s Soldiers answered again after September 11,
            2001. In 2005 the 2nd Battalion deployed to Afghanistan with the 53rd
            Infantry Brigade as part of Task Force Phoenix, the coalition mission
            to train and stand up the new Afghan National Army. Reorganized into
            a security force, the battalion secured Camp Phoenix and regional
            headquarters across the country and escorted convoys throughout the
            theater, service recognized with the Meritorious Unit Commendation.
            {/* TODO VERIFY: Per Wikipedia's lineage, the 116th also holds GWOT campaign credit — Operation Iraqi Freedom (both 2-116 and 3-116; 3-116 earned a Meritorious Unit Commendation for Iraq 2005-2006), Operation New Dawn (2-116), Operation Inherent Resolve (3-116, HIMARS fire missions in CENTCOM), and Operation Spartan Shield (regimental level). Dates/attribution not confirmed against a primary CMH lineage cert — verify with Matt before adding to the public page. NOTE: no source ties the 116th to Guantanamo; do NOT claim it. */}
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
