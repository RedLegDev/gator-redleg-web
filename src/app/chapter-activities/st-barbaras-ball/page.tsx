import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { stBarbarasBallEventSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "St. Barbara's Ball",
  description:
    "St. Barbara's Military Ball, originally scheduled for December 12, 2026, has been canceled.",
};

export default function StBarbarasBallPage() {
  return (
    <>
      <JsonLd data={stBarbarasBallEventSchema} />
      <PageHero
        eyebrow="Canceled"
        title="St. Barbara's Ball"
        subtitle="The 2026 Dining Out, originally scheduled for Saturday, December 12, has been canceled."
      />
      <Container className="py-16">
        <div className="max-w-3xl">
          <div className="rounded border-l-4 border-redleg bg-neutral-50 p-6">
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-redleg">
              Cancellation of Saint Barbara&apos;s Military Ball
            </h2>
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-artillery-light">
              <p>
                Please be advised that{" "}
                <strong className="text-artillery">
                  Saint Barbara&apos;s Military Ball
                </strong>
                , originally scheduled for{" "}
                <strong className="text-artillery">December 12th, 2026</strong>,
                has been <strong className="text-artillery">canceled</strong>.
              </p>
              <p>
                We made this difficult decision after a comprehensive review of
                current fiscal constraints and logistical demands. Because of
                significant budgetary restrictions and competing mission
                requirements across participating units, we cannot dedicate the
                funding, personnel, and resources needed to host the event at
                this time.
              </p>
              <p>
                We sincerely appreciate your support, preparation, and
                understanding as we prioritize our core operational readiness
                and resource allocation.
              </p>
              <p>
                Please direct any immediate questions regarding contract
                adjustments, vendor coordination, or unit impacts to the Gator
                Redleg Chapter at{" "}
                <a
                  href="mailto:president@gatorredleg.org"
                  className="text-redleg underline"
                >
                  president@gatorredleg.org
                </a>
                .
              </p>
            </div>
            <p className="mt-6 text-artillery">
              Antonio C. Hyman
              <br />
              <span className="text-sm text-artillery-muted">
                Interim Chapter President, Gator Redleg Chapter of the USFAA
              </span>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/chapter-activities/st-barbaras-ball/faq">
              Traditions & FAQs
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
