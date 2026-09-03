import { Container } from "@/components/Container";
import { VerifySignInForm } from "@/components/board/VerifySignInForm";

export default async function BoardVerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  if (!token) {
    return (
      <Container className="py-16">
        <p className="text-center text-neutral-600">Missing sign-in token.</p>
      </Container>
    );
  }

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-md rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h1 className="font-display text-xl font-semibold text-artillery">
          Confirm sign-in
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          Click below to finish signing in. This step prevents email security
          scanners from consuming your one-time link before you do.
        </p>
        <div className="mt-6">
          <VerifySignInForm token={token} />
        </div>
      </div>
    </Container>
  );
}
