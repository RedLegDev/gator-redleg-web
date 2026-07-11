/**
 * Renders a JSON-LD structured-data block. Server component — the script is
 * present in the initial HTML so Google (and other crawlers that don't run
 * JS) can read it without rendering.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here — no user input, all static.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
