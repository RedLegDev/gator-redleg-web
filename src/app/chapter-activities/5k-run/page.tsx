import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { FACEBOOK_URL } from "@/lib/nav";

export const metadata: Metadata = {
  title: "5K Run",
  description: "The Gator Redleg 5K Fun Run — a charity fun run for Florida's Redlegs.",
};

export default function RunPage() {
  return (
    <>
      <PageHero
        eyebrow="Chapter Activities"
        title="5K Fun Run"
        subtitle="A charity fun run in support of Florida's Redlegs."
      />
      <Container className="py-16">
        <div className="max-w-2xl">
          <p className="text-lg leading-relaxed text-artillery-light">
            The Gator Redleg 5K Fun Run brings the community together for a
            morning of fitness and camaraderie, raising funds for the chapter and
            the Soldiers and families we support.
          </p>
          <div className="mt-8 rounded border-l-4 border-gold bg-neutral-50 p-6">
            <p className="font-label text-sm uppercase tracking-wide text-artillery-muted">
              Not currently scheduled
            </p>
            <p className="mt-2 text-sm text-artillery-light">
              Registration will open when the next run is announced. Follow us on{" "}
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
