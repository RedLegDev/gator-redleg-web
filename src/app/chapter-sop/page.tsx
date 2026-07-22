import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { MarkdownProse, markdownToc } from "@/components/MarkdownProse";

export const metadata: Metadata = {
  title: "Chapter SOP",
  description:
    "Standing Operating Procedures for the Gator Redleg Chapter — guidance for the Executive Committee, event coordinators, awards, and day-to-day chapter operations.",
};

export const dynamic = "force-static";

function loadSop(): string {
  return fs.readFileSync(
    path.join(process.cwd(), "content/chapter-sop.md"),
    "utf8"
  );
}

export default function ChapterSopPage() {
  const markdown = loadSop();
  const toc = markdownToc(markdown);

  return (
    <>
      <PageHero
        eyebrow="About"
        title="Chapter SOP"
        subtitle="Standing Operating Procedures — living guidance for the Executive Committee and volunteers."
      />
      <Container className="py-16">
        <div className="lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
          <aside className="mb-10 lg:mb-0">
            <nav
              aria-label="SOP sections"
              className="lg:sticky lg:top-28"
            >
              <p className="font-heading text-xs uppercase tracking-[0.2em] text-artillery-muted">
                Contents
              </p>
              <ol className="mt-3 space-y-2 border-l border-artillery-light/20 pl-4">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-sm leading-snug text-artillery-light transition-colors hover:text-redleg"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-xs leading-relaxed text-artillery-muted">
                Guidance, not bylaws. Owned by the Chapter President; updated by
                the Executive Committee without a membership vote.
              </p>
            </nav>
          </aside>

          <MarkdownProse markdown={markdown} className="max-w-none" />
        </div>
      </Container>
    </>
  );
}
