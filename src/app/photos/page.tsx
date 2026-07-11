import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Photos",
  description: "Photo galleries from Gator Redleg Chapter events.",
};

const GALLERIES = [
  { label: "2022 St. Barbara's Ball", href: "/photos/2022-st-barbaras-ball" },
  { label: "2020 St. Barbara's Ball", href: "/photos/2020-st-barbaras-ball" },
  { label: "2019 St. Barbara's Ball", href: "/photos/2019-st-barbaras-ball" },
  { label: "2019 Redleg Social", href: "/photos/2019-redleg-social" },
];

export default function PhotosPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Chapter Photos"
        subtitle="Moments from balls, socials, and tournaments across the years."
      />
      <Container className="py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {GALLERIES.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group flex items-center justify-between border-t-4 border-redleg bg-neutral-50 p-6 transition-shadow hover:shadow-lg"
            >
              <span className="font-display text-xl font-semibold text-artillery group-hover:text-redleg">
                {g.label}
              </span>
              <span aria-hidden className="text-redleg">
                →
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
