const LISTMONK_ACTION = "https://mail.redleg.dev/subscription/form";
const GATOR_LIST_UUID = "3868da91-6816-4ea1-9a1b-cd8fdad0d591";

/**
 * Listmonk subscription form (mail.redleg.dev). Plain POST — submitting
 * hands off to Listmonk's hosted confirmation page, so no client JS is needed.
 */
export function NewsletterSignup() {
  return (
    <form
      method="post"
      action={LISTMONK_ACTION}
      className="max-w-md rounded border-l-4 border-gold bg-neutral-50 p-6"
    >
      <input type="hidden" name="nonce" />
      <input type="hidden" name="l" value={GATOR_LIST_UUID} />

      <label htmlFor="nl-email" className="mb-1.5 block text-sm font-semibold text-artillery">
        Email <span className="text-redleg">*</span>
      </label>
      <input
        id="nl-email"
        type="email"
        name="email"
        required
        placeholder="you@example.com"
        className="w-full rounded border-2 border-black/15 px-3 py-2.5 text-sm transition-colors focus:border-redleg focus:outline-none focus:ring-2 focus:ring-redleg/20"
      />

      <label
        htmlFor="nl-name"
        className="mb-1.5 mt-4 block text-sm font-semibold text-artillery"
      >
        Name <span className="font-normal text-artillery-muted">(optional)</span>
      </label>
      <input
        id="nl-name"
        type="text"
        name="name"
        placeholder="Your name"
        className="w-full rounded border-2 border-black/15 px-3 py-2.5 text-sm transition-colors focus:border-redleg focus:outline-none focus:ring-2 focus:ring-redleg/20"
      />

      <button
        type="submit"
        className="mt-5 w-full rounded bg-redleg px-6 py-3 font-display font-semibold uppercase tracking-wide text-white transition-colors hover:bg-redleg-dark"
      >
        Subscribe
      </button>
    </form>
  );
}
