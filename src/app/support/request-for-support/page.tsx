import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { SupportRequestForm } from "@/components/SupportRequestForm";
import { CHARITABLE_PLAYBOOK_PATH } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Request for Support",
  description:
    "Submit a request for support from the Gator Redleg Chapter's charitable programs.",
};

export default function RequestForSupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Request for Support"
        subtitle="Soldiers, units, and families can request support through the chapter's charitable programs."
      />
      <Container className="py-16">
        <div className="max-w-3xl">
          <div className="rounded border-l-4 border-gold bg-amber-50/60 p-6">
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-redleg">
              Never Leave a Fallen Comrade
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-artillery-light">
              The Gator Redleg Chapter stands ready to support Florida&apos;s
              Field Artillery Soldiers, veterans, and their families through our
              established support programs. Compare programs below, then submit a
              request. Full policy lives in the{" "}
              <a
                href={CHARITABLE_PLAYBOOK_PATH}
                className="font-semibold text-redleg underline"
              >
                Charitable Action Playbook
              </a>
              .
            </p>
          </div>

          <div className="mt-8">
            <SupportRequestForm />
          </div>
        </div>
      </Container>
    </>
  );
}
