"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { boardInputClass } from "@/lib/board/ui";

const inputClass = boardInputClass;

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
          If <strong>{email}</strong> is an active board member, a sign-in link
          is on its way. Links expire in 15 minutes.
        </p>
        <p className="mt-2 text-neutral-600">
          Using a <code className="text-xs">.mil</code> address? If nothing
          arrives, try a personal email on file with the chapter.
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
          "w-full min-h-11 rounded bg-redleg px-4 py-3 text-base font-display font-semibold uppercase tracking-wide text-white transition-colors hover:bg-redleg-dark disabled:opacity-60 md:text-sm"
        )}
      >
        {state === "sending" ? "Sending…" : "Email me a sign-in link"}
      </button>
    </form>
  );
}
