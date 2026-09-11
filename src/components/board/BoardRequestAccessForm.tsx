"use client";

import Link from "next/link";
import { useState } from "react";
import {
  boardButtonPrimaryClass,
  boardInputClass,
} from "@/lib/board/ui";

const ENDPOINT = "/api/board/request-access";

const labelClass =
  "mb-1.5 block font-heading text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500";

export function BoardRequestAccessForm({
  initialEmail = "",
}: {
  initialEmail?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      rank: String(fd.get("rank") ?? ""),
      unit: String(fd.get("unit") ?? ""),
      reason: String(fd.get("reason") ?? ""),
    };

    setStatus("sending");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="space-y-5">
        <div>
          <p className="font-display text-xl font-semibold text-artillery sm:text-2xl">
            Request received
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
            A board member will review it and add you at People if you should
            have access. That usually happens within a couple of days. After
            you&apos;re on the roster, sign in with a one-time code from the
            same email.
          </p>
        </div>
        <Link
          href="/board/login"
          className={`${boardButtonPrimaryClass} w-full`}
        >
          Back to sign-in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <p className="font-display text-xl font-semibold text-artillery sm:text-2xl">
          Request access
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
          Not on the roster, or no code arrived? Send this and a board member
          can add you.
        </p>
      </div>

      {status === "error" && (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-800"
          role="alert"
        >
          Something went wrong. Try again in a moment.
        </p>
      )}

      <label className="block">
        <span className={labelClass}>
          Name <span className="text-redleg">*</span>
        </span>
        <input
          name="name"
          required
          autoComplete="name"
          className={boardInputClass}
          placeholder="Your name"
        />
      </label>

      <label className="block">
        <span className={labelClass}>
          Email <span className="text-redleg">*</span>
        </span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={initialEmail}
          className={boardInputClass}
          placeholder="you@example.com"
        />
      </label>

      <label className="block">
        <span className={labelClass}>Rank</span>
        <input
          name="rank"
          autoComplete="off"
          className={boardInputClass}
          placeholder="Optional — CPT, SFC, civilian"
        />
      </label>

      <label className="block">
        <span className={labelClass}>
          Unit or chapter role <span className="text-redleg">*</span>
        </span>
        <input
          name="unit"
          required
          autoComplete="organization"
          className={boardInputClass}
          placeholder="2-116 FA, Member at Large, spouse…"
        />
      </label>

      <label className="block">
        <span className={labelClass}>
          Why you need access <span className="text-redleg">*</span>
        </span>
        <textarea
          name="reason"
          required
          rows={4}
          className={`${boardInputClass} min-h-24 resize-y`}
          placeholder="What work do you need the hub for?"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className={`${boardButtonPrimaryClass} w-full`}
      >
        {status === "sending" ? "Sending…" : "Submit request"}
      </button>

      <p className="text-center text-sm text-neutral-500">
        <Link href="/board/login" className="font-semibold text-redleg hover:underline">
          Back to sign-in
        </Link>
      </p>
    </form>
  );
}
