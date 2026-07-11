import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Gator Redleg Chapter of the United States Field Artillery Association.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact Us"
        subtitle="Questions about the chapter, membership, events, or sponsorship? Send us a message and we'll get back to you."
      />
      <Container className="py-16">
        <div className="max-w-2xl">
          <div className="rounded border-l-4 border-gold bg-amber-50/60 p-6">
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-redleg">
              Reach the Chapter
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-artillery-light">
              Use the form below to reach the chapter&apos;s leadership, or email
              us directly at{" "}
              <a
                href="mailto:president@gatorredleg.org"
                className="font-semibold text-redleg underline"
              >
                president@gatorredleg.org
              </a>
              . Soldiers, units, or families requesting charitable support should
              use the{" "}
              <a
                href="/support/request-for-support"
                className="font-semibold text-redleg underline"
              >
                Request for Support
              </a>{" "}
              form instead.
            </p>
          </div>

          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </>
  );
}
