import {
  boardButtonPrimaryClass,
} from "@/lib/board/ui";

export function VerifySignInForm({ token }: { token: string }) {
  return (
    <form method="POST" action="/api/board/verify" className="space-y-5">
      <div>
        <p className="font-display text-xl font-semibold text-artillery sm:text-2xl">
          Confirm sign-in
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
          Email security scanners can consume one-time links. Click below to
          finish signing in yourself.
        </p>
      </div>
      <input type="hidden" name="token" value={token} />
      <button type="submit" className={`${boardButtonPrimaryClass} w-full`}>
        Enter the board hub
      </button>
      <p className="text-center text-xs text-neutral-500">
        This completes your magic-link session on this device.
      </p>
    </form>
  );
}
