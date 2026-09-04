import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { stBarbarasBallEventSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "St. Barbara's Ball",
  description:
    "St. Barbara's Ball 2026 — a Gator Redleg Dining Out on Saturday, December 12, 2026 at the Winter Haven Armory.",
  openGraph: {
    images: [
      {
        url: "/photos/save-the-date-2026.jpg",
        width: 1200,
        height: 1680,
        alt: "Save the Date — St. Barbara's Reception & Ball, Saturday, December 12, 2026, Winter Haven National Guard Armory, hosted by the Gator Redlegs.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/photos/save-the-date-2026.jpg"],
  },
};

const DETAILS = [
  ["Networking Social", "Friday, December 11, 2026 (evening)"],
  ["Dining Out", "Saturday, December 12, 2026"],
  ["Where", "Winter Haven Armory · Winter Haven, FL"],
  [
    "Dress",
    "Cocktail attire; Soldiers in ASU, AGSU, or Army Mess Dress",
  ],
  [
    "Tickets & Tables",
    "Registration form is live on the chapter store; final pricing publishes when the chapter confirms ticket rates. Individual seats and tables of eight.",
  ],
];

export default function StBarbarasBallPage() {
  return (
    <>
      <JsonLd data={stBarbarasBallEventSchema} />
      <PageHero
        eyebrow="Save the Date"
        title="St. Barbara's Ball"
        subtitle="A Gator Redleg Dining Out · Saturday, December 12, 2026 · Winter Haven Armory"
      />
      <Container className="py-16">
        <div className="max-w-3xl">
          <figure className="mx-auto max-w-sm sm:float-right sm:ml-8 sm:mb-6 sm:max-w-sm">
            <Image
              src="/photos/save-the-date-2026.jpg"
              alt="Save the Date — St. Barbara's Reception & Ball, honoring the Soldiers of Florida's Army National Guard Field Artillery, Saturday, December 12, 2026, Winter Haven National Guard Armory, hosted by the Gator Redlegs."
              width={1200}
              height={1680}
              priority
              className="h-auto w-full rounded shadow-lg"
            />
          </figure>

          <p className="text-lg leading-relaxed text-artillery-light">
            Mark your calendars. This December the Gator Redleg Chapter gathers
            to honor Saint Barbara and celebrate the Field Artillery. This year
            it&apos;s a formal Dining Out for our Soldiers, veterans, families,
            and friends of the Regiment.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-artillery-light">
            We&apos;ll kick off with a networking social on{" "}
            <strong className="text-artillery">Friday evening, December 11</strong>
            , then gather for the Dining Out on Saturday the 12th. Come swap
            stories, welcome new faces, and raise a glass to the Redlegs who came
            before us.
          </p>

          <figure className="mt-10 sm:float-right sm:ml-8 sm:mb-4 sm:max-w-xs">
            <Image
              src="/photos/st-barbaras-ball-2017.jpg"
              alt="Program booklet for the Gator Redleg Chapter's Saint Barbara's Day Celebration, December 9, 2017, in St. Augustine, Florida, on a candlelit banquet table."
              width={1000}
              height={1401}
              className="h-auto w-full rounded shadow-lg"
            />
            <figcaption className="mt-2 font-label text-xs uppercase tracking-wide text-artillery-muted">
              St. Barbara&apos;s Day Celebration · St. Augustine, 2017
            </figcaption>
          </figure>

          {/* What to Know */}
          <div className="mt-10 rounded border-l-4 border-gold bg-neutral-50 p-6">
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-redleg">
              What to Know
            </h2>
            <dl className="mt-4 space-y-3">
              {DETAILS.map(([label, value]) => (
                <div key={label} className="sm:flex sm:gap-4">
                  <dt className="font-label text-sm uppercase tracking-wide text-artillery-muted sm:w-44 sm:shrink-0">
                    {label}
                  </dt>
                  <dd className="text-artillery-light">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/chapter-activities/st-barbaras-ball/faq">
              Traditions & FAQs
            </Button>
            <Button
              href="/chapter-activities/st-barbaras-ball/sponsors"
              variant="secondary"
            >
              Become a Sponsor
            </Button>
          </div>

          {/* Sponsors wanted */}
          <div className="mt-12 rounded border-2 border-gold p-6">
            <h2 className="font-display text-lg font-semibold tracking-wide text-redleg">
              Sponsors Wanted
            </h2>
            <p className="mt-2 leading-relaxed text-artillery-light">
              We&apos;re actively looking for sponsors to help offset the cost of
              the evening so we can get as many Redlegs through the door as
              possible. Three tiers are available —{" "}
              <strong className="text-artillery">King of Battle</strong> ($2,000),{" "}
              <strong className="text-artillery">Master Gunner</strong> ($500),
              and <strong className="text-artillery">Gunner</strong> ($125, covers
              a junior Soldier&apos;s ticket).
            </p>
            <div className="mt-4">
              <Button href="/chapter-activities/st-barbaras-ball/sponsors">
                View Sponsorship Details
              </Button>
            </div>
          </div>

          <p className="mt-8 text-sm italic text-artillery-muted">
            Ticketing opens late summer — individual seats and full tables of
            eight.
          </p>
        </div>
      </Container>
    </>
  );
}
