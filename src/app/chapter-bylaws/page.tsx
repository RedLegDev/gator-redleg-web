import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { MarkdownProse, markdownToc } from "@/components/MarkdownProse";
import { CHAPTER_BYLAWS } from "@/lib/chapter-docs";

export const metadata: Metadata = {
  title: "Chapter Bylaws",
  description:
    "Bylaws of the Gator Redleg Chapter of the United States Field Artillery Association — governing the Chapter's officers, membership, meetings, and fiscal matters.",
};

export const dynamic = "force-static";

export default function ChapterBylawsPage() {
  const markdown = CHAPTER_BYLAWS;
  const toc = markdownToc(markdown);

  return (
    <>
      <PageHero
        eyebrow="About"
        title="Chapter Bylaws"
        subtitle="Governing document of the Gator Redleg Chapter, USFAA — updated 25 April 2024."
      />
      <Container className="py-16">
        <div className="lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
          <aside className="mb-10 lg:mb-0">
            <nav
              aria-label="Bylaws articles"
              className="lg:sticky lg:top-28"
            >
              <p className="font-heading text-xs uppercase tracking-[0.2em] text-artillery-muted">
                Articles
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
                Binding on the Chapter. Amendments require a two-thirds vote of
                members present (Article IX).
              </p>
            </nav>
          </aside>

          <MarkdownProse markdown={markdown} className="max-w-none" />
        </div>
      </Container>
    </>
  );
}
