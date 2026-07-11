import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { FACEBOOK_URL } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Golf Tournament",
  description:
    "The annual Gator Redleg Golf Tournament raising funds for the chapter and our Soldiers.",
};

export default function GolfPage() {
  return (
    <>
      <PageHero
        eyebrow="Chapter Activities"
        title="Gator Redleg Golf Tournament"
        subtitle="A scramble raising funds for the chapter and other military organizations."
      />
      <Container className="py-16">
        <div className="max-w-2xl">
          <p className="text-lg leading-relaxed text-artillery-light">
            The Gator Redleg Golf Tournament brings Redlegs, families, and
            sponsors together for a day on the course in support of Florida&apos;s
            Field Artillery Soldiers and the veteran community.
          </p>
          <div className="mt-8 rounded border-l-4 border-gold bg-neutral-50 p-6">
            <p className="font-label text-sm uppercase tracking-wide text-artillery-muted">
              Not currently scheduled
            </p>
            <p className="mt-2 text-sm text-artillery-light">
              Registration will open when the next tournament is announced.
              Follow us on{" "}
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-redleg underline"
              >
                Facebook
              </a>{" "}
              for updates.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
