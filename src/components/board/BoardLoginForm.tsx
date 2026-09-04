"use client";

import { useState } from "react";
import {
  boardButtonPrimaryClass,
  boardInputClass,
} from "@/lib/board/ui";

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
      <div className="space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-artillery">
          <span className="font-display text-lg font-semibold" aria-hidden>
            ✓
          </span>
        </div>
        <div>
          <p className="font-display text-xl font-semibold text-artillery">
            Check your inbox
          </p>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            If <strong className="text-artillery">{email}</strong> is on the
            active roster, a one-time sign-in link is on its way. It expires in
            15 minutes.
          </p>
        </div>
        <p className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-600">
          Using a <span className="font-medium text-artillery">.mil</span>{" "}
          address? Military filters often delay or drop magic links — try a
          personal email on file with the chapter.
        </p>
        <button
          type="button"
          onClick={() => {
            setState("idle");
            setEmail("");
          }}
          className="text-sm font-semibold text-redleg hover:underline"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <p className="font-display text-xl font-semibold text-artillery sm:text-2xl">
          Sign in
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
          Enter the email on the board roster. We’ll send a magic link — no
          password.
        </p>
      </div>

      {error && (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-800"
          role="alert"
        >
          That sign-in link was invalid or expired. Request a new one below.
        </p>
      )}
      {state === "error" && (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-800"
          role="alert"
        >
          Something went wrong. Try again in a moment.
        </p>
      )}

      <label className="block">
        <span className="mb-1.5 block font-heading text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
          Email address
        </span>
        <input
          type="email"
          required
          autoComplete="email"
          autoFocus
          className={boardInputClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </label>

      <button
        type="submit"
        disabled={state === "sending"}
        className={`${boardButtonPrimaryClass} w-full`}
      >
        {state === "sending" ? "Sending link…" : "Email me a sign-in link"}
      </button>

      <p className="text-center text-xs leading-relaxed text-neutral-500">
        Links work once. Open the email on this device when you can.
      </p>
    </form>
  );
}
