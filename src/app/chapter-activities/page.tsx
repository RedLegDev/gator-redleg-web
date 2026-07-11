import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Prose } from "@/components/Prose";
import { LinkCard } from "@/components/LinkCard";

export const metadata: Metadata = {
  title: "Chapter Activities",
  description:
    "The Gator Redleg Chapter's annual events — St. Barbara's Ball, golf, softball, and the 5K run.",
};

const ACTIVITIES = [
  {
    label: "St. Barbara's Ball",
    href: "/chapter-activities/st-barbaras-ball",
    blurb: "Our largest event — a dining-out celebrating the King of Battle.",
  },
  {
    label: "Softball Tournament",
    href: "/chapter-activities/softball-tournament",
    blurb: "The annual Kenny Fike Memorial charity tournament.",
  },
  {
    label: "Golf Tournament",
    href: "/chapter-activities/golf-tournament",
    blurb: "A spring scramble raising funds for the chapter and our Soldiers.",
  },
  {
    label: "5K Run",
    href: "/chapter-activities/5k-run",
    blurb: "Our newest event — a charity fun run for Florida's Redlegs.",
  },
];

export default function ChapterActivitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Chapter Activities"
        subtitle="Meaningful events that raise funds for the chapter and bring our Field Artillery community together."
      />
      <Container className="py-16">
        <Prose>
          <p>
            The Gator Redleg Association holds three main events a year. In the
            spring we hold an Annual Golf Tournament that raises money for the
            chapter and other military organizations — this year, proceeds from
            the 6th Annual Golf Tournament helped sponsor Hockey Heals 22, a{" "}
            <a
              href="https://tampawarriors.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tampa Warriors
            </a>{" "}
            Hockey charity event. Also in the fall the chapter holds the Annual
            Kenny Fike Memorial charity softball tournament. Our largest event
            hosted by the Gator Redlegs is the Saint Barbara Ball, celebrating
            our heritage and recognizing those in our Field Artillery community.
          </p>
          <p>We are currently exploring a 5K charity run.</p>
        </Prose>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {ACTIVITIES.map((a) => (
            <LinkCard
              key={a.href}
              href={a.href}
              title={a.label}
              blurb={a.blurb}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
