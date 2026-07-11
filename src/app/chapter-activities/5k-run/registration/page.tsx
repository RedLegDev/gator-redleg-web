import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { EmbedSlot } from "@/components/EmbedSlot";
import { EMBEDS } from "@/lib/embeds";

export const metadata: Metadata = {
  title: "5K Registration",
  description: "Register for the Gator Redleg 5K Fun Run.",
};

export default function RunRegistrationPage() {
  return (
    <>
      <PageHero eyebrow="5K Fun Run" title="Registration" />
      <Container className="py-16">
        <div className="max-w-2xl">
          <p className="text-lg leading-relaxed text-artillery-light">
            Sign up for the Gator Redleg 5K Fun Run.
          </p>
          <EmbedSlot href={EMBEDS.runRegistration} label="Register for the 5K" />
        </div>
      </Container>
    </>
  );
}
