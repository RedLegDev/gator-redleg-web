import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { EmbedSlot } from "@/components/EmbedSlot";
import { EMBEDS } from "@/lib/embeds";

export const metadata: Metadata = {
  title: "Softball Registration",
  description: "Register your team or sponsorship for the softball tournament.",
};

export default function SoftballRegistrationPage() {
  return (
    <>
      <PageHero eyebrow="Softball Tournament" title="Registration" />
      <Container className="py-16">
        <div className="max-w-2xl">
          <p className="text-lg leading-relaxed text-artillery-light">
            Register your team or secure a sponsorship for the 1SG Fike Memorial
            Softball Tournament.
          </p>
          <EmbedSlot
            href={EMBEDS.softballRegistration}
            label="Register / Sponsor"
          />
        </div>
      </Container>
    </>
  );
}
