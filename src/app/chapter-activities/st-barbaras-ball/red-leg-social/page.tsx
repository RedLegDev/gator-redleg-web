import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Red Leg Social",
  description:
    "Join us Friday evening on the Avalon Terrace at the Hard Rock Hotel for the Red Leg Social.",
};

export default function RedLegSocialPage() {
  return (
    <>
      <PageHero
        eyebrow="St. Barbara's Ball"
        title="Red Leg Social"
        subtitle="Join us for an unforgettable evening."
      />
      <Container className="py-16">
        <div className="max-w-2xl text-lg leading-relaxed text-artillery-light">
          <p>
            Join us Friday evening on the Avalon Terrace at the Hard Rock Hotel
            for the Redleg Social, where you can enjoy the company of fellow
            Redlegs in a relaxed and informal setting. Attire for the evening is
            business casual.
          </p>
          <p className="mt-4">
            Savor our delicious offerings, including popular Angus Beef Sliders,
            Chicken Parmesan Sliders, and BBQ Pulled Pork Sliders, complemented
            by a mashed potato bar and a fresh salad bar. Take advantage of the
            cash bar with skilled bartenders ready to serve your favorite drinks.
          </p>
          <p className="mt-4">
            This is a fantastic opportunity to reconnect, share stories, and
            build camaraderie with fellow members in a vibrant atmosphere. We
            look forward to seeing you there!
          </p>
        </div>
      </Container>
    </>
  );
}
