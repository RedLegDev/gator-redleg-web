import { Button } from "@/components/Button";

/**
 * Renders a call-to-action for content that lives in an external service
 * (Stripe, Google Forms, etc.). When the URL is known it renders a
 * button; when it isn't yet wired, it shows a tasteful pending state instead
 * of a broken embed.
 */
export function EmbedSlot({
  href,
  label,
  note,
}: {
  href: string | null;
  label: string;
  note?: string;
}) {
  if (href) {
    return (
      <div className="mt-2">
        <Button href={href} variant="primary" size="lg">
          {label}
        </Button>
      </div>
    );
  }
  return (
    <div className="mt-2 rounded border border-dashed border-redleg/40 bg-redleg/5 p-6">
      <p className="font-label text-sm uppercase tracking-wide text-redleg">
        {label}
      </p>
      <p className="mt-2 text-sm text-artillery-light">
        {note ??
          "Details are being finalized. Check back soon or reach us on Facebook for the latest."}
      </p>
    </div>
  );
}
