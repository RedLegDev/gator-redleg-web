"use client";

import { useState } from "react";
import { CHARITABLE_PLAYBOOK_PATH } from "@/lib/nav";
import { cn } from "@/lib/cn";
import {
  PROGRAM_GROUPS,
  type SupportProgram,
} from "@/lib/support-request";

const SUPPORT_REQUEST_ENDPOINT = "/api/support-request";
const CONTACT_EMAIL = "president@gatorredleg.org";

const inputClass =
  "w-full rounded border-2 border-black/15 px-3 py-2.5 text-sm transition-colors focus:border-redleg focus:outline-none focus:ring-2 focus:ring-redleg/20";
const labelClass = "mb-1.5 block text-sm font-semibold text-artillery";

function ProgramCard({
  program,
  selected,
  onSelect,
}: {
  program: SupportProgram;
  selected: boolean;
  onSelect: () => void;
}) {
  const inputId = `program-${program.value}`;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "block cursor-pointer rounded border-2 bg-white p-4 transition-all",
        selected
          ? "border-redleg shadow-[0_0_0_1px_var(--color-redleg)]"
          : "border-black/10 hover:border-black/25"
      )}
    >
      <div className="flex gap-3">
        <input
          id={inputId}
          type="radio"
          name="requestType"
          value={program.value}
          required
          checked={selected}
          onChange={onSelect}
          className="mt-1 h-4 w-4 shrink-0 accent-redleg"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="font-heading text-base font-semibold uppercase tracking-[0.08em] text-artillery">
              {program.name}
            </span>
            <span className="text-sm text-artillery-muted">
              {program.summary}
            </span>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-artillery-light">
            {program.description}
          </p>

          {program.tiers.length > 0 && (
            <div className="mt-3">
              <p className="font-label text-[0.65rem] uppercase tracking-[0.18em] text-gold-dark">
                Guidelines / funding
              </p>
              <ul className="mt-1.5 space-y-1 text-sm text-artillery-light">
                {program.tiers.map((tier) => (
                  <li key={tier} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-redleg" />
                    <span>{tier}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {program.restrictions.length > 0 && (
            <div
              className={cn(
                "mt-3 rounded border-l-4 p-3 text-sm",
                selected
                  ? "border-gold bg-amber-50/80 text-artillery-light"
                  : "border-black/15 bg-neutral-50 text-artillery-light"
              )}
            >
              <p className="font-label text-[0.65rem] uppercase tracking-[0.18em] text-redleg">
                Restrictions
              </p>
              <ul className="mt-1.5 space-y-1">
                {program.restrictions.map((rule) => (
                  <li key={rule} className="flex gap-2">
                    <span aria-hidden className="shrink-0 font-semibold text-redleg">
                      ·
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
              {program.value === "end-of-mission" && (
                <p className="mt-2">
                  <a
                    href="/regimental-coin"
                    className="font-semibold text-redleg underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Regimental Coin page
                  </a>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </label>
  );
}

export function SupportRequestForm() {
  const [requestType, setRequestType] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      requesterName: String(fd.get("requesterName") ?? ""),
      unit: String(fd.get("unit") ?? ""),
      email: String(fd.get("email") ?? ""),
      eventDate: String(fd.get("eventDate") ?? ""),
      requestType: String(fd.get("requestType") ?? ""),
      amount: String(fd.get("amount") ?? ""),
      description: String(fd.get("description") ?? ""),
    };

    setStatus("sending");

    try {
      const res = await fetch(SUPPORT_REQUEST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("ok");
      form.reset();
      setRequestType("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded border-l-4 border-green-600 bg-green-50 p-6">
        <h3 className="font-display text-lg font-semibold text-green-800">
          Request received
        </h3>
        <p className="mt-2 text-sm text-green-900">
          We&apos;ve got your six. You&apos;ll hear from us soon at the email you
          provided.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-redleg underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === "error" && (
        <div className="rounded border-l-4 border-redleg bg-redleg/5 p-4 text-sm text-redleg-dark">
          Something went wrong. Please try again or email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">
            {CONTACT_EMAIL}
          </a>
          .
        </div>
      )}

      <div>
        <label htmlFor="requesterName" className={labelClass}>
          Requester Name/Rank <span className="text-redleg">*</span>
        </label>
        <input
          id="requesterName"
          name="requesterName"
          required
          className={inputClass}
          placeholder="e.g., CPT John Smith"
        />
      </div>

      <div>
        <label htmlFor="unit" className={labelClass}>
          Unit/Organization <span className="text-redleg">*</span>
        </label>
        <input
          id="unit"
          name="unit"
          required
          className={inputClass}
          placeholder="e.g., Alpha Battery, 2-116th FA"
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Contact Email <span className="text-redleg">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClass}
          placeholder="your.email@mail.mil"
        />
        <p className="mt-1 text-xs text-artillery-muted">
          You&apos;ll receive confirmation at this address.
        </p>
      </div>

      <div>
        <label htmlFor="eventDate" className={labelClass}>
          Event/Need Date <span className="text-redleg">*</span>
        </label>
        <input
          id="eventDate"
          name="eventDate"
          type="date"
          required
          className={inputClass}
        />
        <p className="mt-1 text-xs text-artillery-muted">
          When do you need this support? Helps us prioritize urgency.
        </p>
      </div>

      <fieldset className="space-y-4">
        <legend className={labelClass}>
          Support Program <span className="text-redleg">*</span>
        </legend>
        <p className="text-sm text-artillery-muted">
          Pick the program that fits. Guidelines and restrictions are listed on
          each option — full detail is in the{" "}
          <a
            href={CHARITABLE_PLAYBOOK_PATH}
            className="font-semibold text-redleg underline"
          >
            Charitable Action Playbook
          </a>
          .
        </p>

        {PROGRAM_GROUPS.map((group) => (
          <div key={group.label} className="space-y-2.5">
            <p className="font-label text-xs uppercase tracking-[0.2em] text-redleg">
              {group.label}
            </p>
            <div className="space-y-2.5">
              {group.options.map((program) => (
                <ProgramCard
                  key={program.value}
                  program={program}
                  selected={requestType === program.value}
                  onSelect={() => setRequestType(program.value)}
                />
              ))}
            </div>
          </div>
        ))}
      </fieldset>

      <div>
        <label htmlFor="amount" className={labelClass}>
          Requested Amount (if applicable)
        </label>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-artillery-muted">$</span>
          <input
            id="amount"
            name="amount"
            type="number"
            min="0"
            step="0.01"
            className={inputClass}
            placeholder="0.00"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Request Description <span className="text-redleg">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          className={`${inputClass} min-h-32 resize-y`}
          placeholder="Please provide details about your request, including purpose, timeline, and any other relevant information..."
        />
        <p className="mt-1 text-xs text-artillery-muted">
          Be as specific as possible to help us process your request
          efficiently.
        </p>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded bg-redleg px-6 py-4 font-display font-semibold uppercase tracking-wide text-white transition-colors hover:bg-redleg-dark disabled:opacity-60"
      >
        {status === "sending" ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}
