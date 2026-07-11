import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <section className="bg-artillery text-white">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-label text-sm uppercase tracking-[0.3em] text-gold">
          Off the Firing Line
        </p>
        <h1 className="mt-4 font-display text-6xl font-bold tracking-wide">
          404
        </h1>
        <p className="mt-4 max-w-md text-white/80">
          That round didn&apos;t land — the page you&apos;re looking for
          isn&apos;t here.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded bg-redleg px-6 py-3 font-display font-semibold uppercase tracking-wide text-white transition-colors hover:bg-redleg-dark"
        >
          Back to Home
        </Link>
      </Container>
    </section>
  );
}
