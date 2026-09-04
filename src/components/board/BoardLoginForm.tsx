"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  boardButtonPrimaryClass,
  boardInputClass,
} from "@/lib/board/ui";

const OTP_LENGTH = 6;

type Step = "email" | "code";

export function BoardLoginForm({ error }: { error?: boolean }) {
  const router = useRouter();
  const codeRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<Step>("email");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [formError, setFormError] = useState<string | null>(
    error ? "That sign-in attempt failed. Request a new code." : null
  );

  useEffect(() => {
    if (step === "code") codeRef.current?.focus();
  }, [step]);

  async function sendCode(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setFormError(null);
    try {
      const res = await fetch("/api/board/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("failed");
      setCode("");
      setStep("code");
    } catch {
      setFormError("Something went wrong. Try again in a moment.");
    }
    setSending(false);
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setVerifying(true);
    setFormError(null);
    try {
      const res = await fetch("/api/board/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        setFormError(json.error ?? "Invalid or expired code.");
        setVerifying(false);
        return;
      }
      router.replace("/board");
      router.refresh();
    } catch {
      setFormError("Something went wrong. Try again.");
      setVerifying(false);
    }
  }

  async function resendCode() {
    setSending(true);
    setFormError(null);
    try {
      const res = await fetch("/api/board/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("failed");
      setCode("");
      setFormError(null);
    } catch {
      setFormError("Could not resend. Try again shortly.");
    }
    setSending(false);
  }

  if (step === "code") {
    return (
      <form onSubmit={verifyCode} className="space-y-5">
        <div>
          <p className="font-display text-xl font-semibold text-artillery sm:text-2xl">
            Enter your code
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
            We sent a {OTP_LENGTH}-digit code to{" "}
            <strong className="text-artillery">{email}</strong>. Enter it here
            — stay on this device.
          </p>
        </div>

        {formError && (
          <p
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-800"
            role="alert"
          >
            {formError}
          </p>
        )}

        <label className="block">
          <span className="mb-1.5 block font-heading text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Sign-in code
          </span>
          <input
            ref={codeRef}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern={`[0-9]{${OTP_LENGTH}}`}
            maxLength={OTP_LENGTH}
            required
            className={`${boardInputClass} text-center font-mono text-2xl tracking-[0.35em]`}
            value={code}
            onChange={(e) =>
              setCode(e.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH))
            }
            placeholder={"•".repeat(OTP_LENGTH)}
          />
        </label>

        <button
          type="submit"
          disabled={verifying || code.length !== OTP_LENGTH}
          className={`${boardButtonPrimaryClass} w-full`}
        >
          {verifying ? "Signing in…" : "Sign in"}
        </button>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            disabled={sending}
            onClick={resendCode}
            className="text-sm font-semibold text-redleg hover:underline disabled:opacity-60"
          >
            {sending ? "Sending…" : "Resend code"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStep("email");
              setCode("");
              setFormError(null);
            }}
            className="text-sm font-semibold text-neutral-500 hover:text-artillery"
          >
            Use a different email
          </button>
        </div>

        <p className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-600">
          Using a <span className="font-medium text-artillery">.mil</span>{" "}
          address? Codes may arrive slowly — a personal email on the roster is
          more reliable.
        </p>
      </form>
    );
  }

  return (
    <form onSubmit={sendCode} className="space-y-5">
      <div>
        <p className="font-display text-xl font-semibold text-artillery sm:text-2xl">
          Sign in
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
          Enter the email on the board roster. We’ll send a one-time code — no
          password, no link to open.
        </p>
      </div>

      {formError && (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-800"
          role="alert"
        >
          {formError}
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
        disabled={sending}
        className={`${boardButtonPrimaryClass} w-full`}
      >
        {sending ? "Sending code…" : "Email me a code"}
      </button>

      <p className="text-center text-xs leading-relaxed text-neutral-500">
        Codes expire in 15 minutes and work once.
      </p>
    </form>
  );
}
