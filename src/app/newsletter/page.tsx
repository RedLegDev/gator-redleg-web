import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { BASECAMP_URL } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Subscribe to the Redleg Newsletter and chapter communications.",
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
            and news from the Florida Field Artillery community. Subscribe below.
          </p>

          <div className="mt-8">
            <NewsletterSignup />
          </div>

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
