import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { EmbedSlot } from "@/components/EmbedSlot";
import { EMBEDS } from "@/lib/embeds";

export const metadata: Metadata = {
  title: "Golf Registration",
  description: "Register for the Gator Redleg Golf Tournament.",
};

export default function GolfRegistrationPage() {
  return (
    <>
      <PageHero eyebrow="Golf Tournament" title="Registration" />
      <Container className="py-16">
        <div className="max-w-2xl">
          <p className="text-lg leading-relaxed text-artillery-light">
            Register your foursome or sponsorship for the Gator Redleg Golf
            Tournament.
          </p>
          <EmbedSlot href={EMBEDS.golfRegistration} label="Register / Sponsor" />
        </div>
      </Container>
    </>
  );
}
