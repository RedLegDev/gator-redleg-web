import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { EmbedSlot } from "@/components/EmbedSlot";
import { EMBEDS } from "@/lib/embeds";
import { BASECAMP_URL } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "The Redleg Newsletter and chapter communications.",
};

export default function NewsletterPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay Connected"
        title="Redleg Newsletter"
        subtitle="Chapter news, event updates, and ways to stay in the fight."
      />
      <Container className="py-16">
        <div className="max-w-2xl">
          <p className="text-lg leading-relaxed text-artillery-light">
            Keep up with the Gator Redlegs — upcoming events, chapter business,
            and news from the Florida Field Artillery community.
          </p>
          <EmbedSlot
            href={EMBEDS.newsletterSignup}
            label="Read & Subscribe"
            note="Our newsletter archive and sign-up will live here."
          />

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={BASECAMP_URL} variant="secondary">
              Basecamp
            </Button>
            <Button href="/zoom" variant="secondary">
              Zoom Link
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
