"use client";

import { useState } from "react";

export function VerifySignInForm({ token }: { token: string }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/board/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) throw new Error("verify failed");
      window.location.href = "/board";
    } catch {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {error && (
        <p className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          That link was invalid or expired. Request a new one from the login
          page.
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-redleg px-4 py-3 font-display text-sm font-semibold uppercase tracking-wide text-white hover:bg-redleg-dark disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in to board hub"}
      </button>
    </form>
  );
}
