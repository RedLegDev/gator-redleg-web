import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { EmbedSlot } from "@/components/EmbedSlot";
import { EMBEDS } from "@/lib/embeds";

export const metadata: Metadata = {
  title: "2019 Redleg Social Photos",
  description: "Photo gallery from the 2019 Redleg Social.",
};

export default function Photos2019SocialPage() {
  return (
    <>
      <PageHero eyebrow="Photos" title="2019 Redleg Social" />
      <Container className="py-16">
        <EmbedSlot
          href={EMBEDS.photos2019Social}
          label="View the Album"
          note="This gallery will be posted here."
        />
      </Container>
    </>
  );
}
