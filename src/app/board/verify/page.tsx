import Link from "next/link";
import { BoardAuthShell } from "@/components/board/BoardAuthShell";
import { VerifySignInForm } from "@/components/board/VerifySignInForm";
import { boardButtonSecondaryClass } from "@/lib/board/ui";

export const metadata = {
  title: "Confirm board sign-in",
  robots: { index: false, follow: false },
};

export default async function BoardVerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <BoardAuthShell
        title="Chapter Board"
        description="That sign-in link is missing a token. Request a fresh link from the login page."
      >
        <div className="space-y-5">
          <div>
            <p className="font-display text-xl font-semibold text-artillery">
              Link incomplete
            </p>
            <p className="mt-1.5 text-sm text-neutral-600">
              Open the full link from your email, or request a new one.
            </p>
          </div>
          <Link
            href="/board/login"
            className={`${boardButtonSecondaryClass} w-full`}
          >
            Back to sign-in
          </Link>
        </div>
      </BoardAuthShell>
    );
  }

  return (
    <BoardAuthShell
      title="Chapter Board"
      description="One more click to open the board hub on this device."
    >
      <VerifySignInForm token={token} />
    </BoardAuthShell>
  );
}
