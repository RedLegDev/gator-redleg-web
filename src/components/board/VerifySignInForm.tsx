export function VerifySignInForm({ token }: { token: string }) {
  return (
    <form method="POST" action="/api/board/verify">
      <input type="hidden" name="token" value={token} />
      <button
        type="submit"
        className="w-full rounded bg-redleg px-4 py-3 font-display text-sm font-semibold uppercase tracking-wide text-white hover:bg-redleg-dark"
      >
        Sign in to board hub
      </button>
    </form>
  );
}
