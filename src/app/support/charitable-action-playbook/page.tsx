import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { MarkdownProse, markdownToc } from "@/components/MarkdownProse";
import { Button } from "@/components/Button";
import { CHARITABLE_ACTION_PLAYBOOK } from "@/lib/chapter-docs";

export const metadata: Metadata = {
  title: "Charitable Action Playbook",
  description:
    "Guidelines for Gator Redleg Chapter support programs — End of Mission, Shake and Bake, Coordinated Illumination, SEAD, Quick Smoke, and Fire Mission.",
};

export const dynamic = "force-static";

export default function CharitableActionPlaybookPage() {
  const markdown = CHARITABLE_ACTION_PLAYBOOK;
  const toc = markdownToc(markdown);

  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Charitable Action Playbook"
        subtitle="Standards and suggested funding levels for chapter support to Soldiers, units, and families — subject to Executive Board vote."
      />
      <Container className="py-16">
        <div className="mb-10 flex flex-wrap items-center gap-4">
          <Button href="/support/request-for-support">
            Submit a Request for Support
          </Button>
          <p className="text-sm text-artillery-muted">
            Amounts are guidance, not commitments.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
          <aside className="mb-10 lg:mb-0">
            <nav
              aria-label="Playbook programs"
              className="lg:sticky lg:top-28"
            >
              <p className="font-heading text-xs uppercase tracking-[0.2em] text-artillery-muted">
                Programs
              </p>
              <ol className="mt-3 space-y-2 border-l border-artillery-light/20 pl-4">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-sm leading-snug text-artillery-light transition-colors hover:text-redleg"
                    >
                      {item.label.split(" — ")[0]}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <MarkdownProse markdown={markdown} className="max-w-none" />
        </div>
      </Container>
    </>
  );
}
