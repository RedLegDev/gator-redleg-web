"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const inputClass =
  "w-full rounded border border-neutral-300 bg-white px-3 py-2 text-sm text-artillery focus:border-redleg focus:outline-none focus:ring-2 focus:ring-redleg/30";

export function BoardLoginForm({ error }: { error?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/board/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("failed");
      setState("sent");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-lg border border-gold/40 bg-gold/10 p-6 text-sm text-artillery">
        <p className="font-heading font-semibold uppercase tracking-wide">
          Check your inbox
        </p>
        <p className="mt-2">
          If <strong>{email}</strong> is on the board allowlist, a sign-in link
          is on its way. Links expire in 15 minutes.
        </p>
        <p className="mt-2 text-neutral-600">
          Using a <code className="text-xs">.mil</code> address? If nothing
          arrives, try a personal email that&apos;s on the allowlist.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          That sign-in link was invalid or expired. Request a new one.
        </p>
      )}
      {state === "error" && (
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          Something went wrong. Try again.
        </p>
      )}
      <label className="block">
        <span className="mb-1 block font-heading text-xs font-semibold uppercase tracking-wide text-neutral-600">
          Email
        </span>
        <input
          type="email"
          required
          autoComplete="email"
          className={inputClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </label>
      <button
        type="submit"
        disabled={state === "sending"}
        className={cn(
          "w-full rounded bg-redleg px-4 py-3 font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-redleg-dark disabled:opacity-60"
        )}
      >
        {state === "sending" ? "Sending…" : "Email me a sign-in link"}
      </button>
    </form>
  );
}
