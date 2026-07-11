"use client";

import { useState } from "react";
import { CHARITABLE_PLAYBOOK_URL } from "@/lib/nav";
import { PROGRAM_GROUPS } from "@/lib/support-request";

const SUPPORT_REQUEST_ENDPOINT = "/api/support-request";
const CONTACT_EMAIL = "president@gatorredleg.org";

type Guidance = { title: string; body: React.ReactNode };

const PROGRAM_GUIDANCE: Record<string, Guidance> = {
  "shake-and-bake": {
    title: "Shake and Bake — Unit Financial Support",
    body: (
      <>
        <p>
          Units can identify specific needs (e.g., unit events, party shirts,
          morale items) and the Chapter will match that request.
        </p>
        <p className="mt-2 font-semibold">Funding Tiers:</p>
        <ul>
          <li>$250 — Small unit event or morale item request</li>
          <li>$500 — Medium-sized unit event</li>
          <li>$1,000 — Major event with more than 200 attendees</li>
          <li>Specific line item match (unit must still match the cost)</li>
        </ul>
        <p className="mt-2">
          The Regimental crest will be added to funded items where possible so
          Soldiers know the Chapter supported them.
        </p>
      </>
    ),
  },
  "coordinated-illumination": {
    title: "Coordinated Illumination — Membership/Marketing Events",
    body: (
      <>
        <p>
          Request Chapter support for unit events where we can run a membership
          table and attract future donors/members.
        </p>
        <p className="mt-2 font-semibold">Funding Tiers:</p>
        <ul>
          <li>
            $100 — Must include a membership goal of 5–10 USFAA members and
            specific targets for family/employer participation
          </li>
          <li>
            $200 — Must include a membership goal of 8–12 USFAA members and
            specific targets for family/employer participation
          </li>
        </ul>
        <p className="mt-2">
          Examples: Unit Family Days, Employer Days, recruiting events.
        </p>
      </>
    ),
  },
  sead: {
    title: "SEAD — Unit/Chapter Fundraising",
    body: (
      <>
        <p>
          Units commonly hold silent auctions during holiday parties. The SEAD
          program allows the Chapter to donate items for auction, with proceeds
          split between the Chapter and the unit.
        </p>
        <p className="mt-2">
          How it works: Chapter provides auction items, unit runs the auction,
          proceeds are divided.
        </p>
      </>
    ),
  },
  "quick-smoke": {
    title: "Quick Smoke — Immediate Financial Support",
    body: (
      <>
        <p>
          Provides immediate assistance for service members needing support for
          bills, travel costs, or other justifiable expenses.
        </p>
        <p className="mt-2 font-semibold">Funding Tiers:</p>
        <ul>
          <li>$250 — Short-term hardship (no FL NG Foundation support required)</li>
          <li>$500 — Short-term hardship (no FL NG Foundation support required)</li>
          <li>
            $750 — Prolonged hardship (must have requested FL NG Foundation
            support)
          </li>
          <li>
            $1,000 — Significant/enduring hardship (must have requested FL NG
            Foundation support)
          </li>
        </ul>
        <p className="mt-2">
          For requests over $500, the applicant must have already requested
          support from the Florida National Guard Foundation.
        </p>
      </>
    ),
  },
  "fire-mission": {
    title: "Fire Mission — Recognition & Awards",
    body: (
      <>
        <p>
          Financial support for gifts recognizing Soldier or NCO of the Year
          from the battalion.
        </p>
        <p className="mt-2">Support cap: requests are capped at $150 per recipient.</p>
        <p className="mt-2">
          Requests must fall within established guidelines and will be voted on
          by the Executive Board.
        </p>
      </>
    ),
  },
  "end-of-mission": {
    title: "End of Mission — Regimental Coin Initiative",
    body: (
      <>
        <p>
          The Chapter provides Regimental Coins as parting gifts to E-5s and
          below who are ETSing or PCSing outside the regiment.
        </p>
        <p className="mt-2">Cost: $15 per coin.</p>
        <p className="mt-2">
          Serves as a token of recognition for those who leave without formal
          acknowledgment. See the{" "}
          <a href="/regimental-coin" className="font-semibold text-redleg underline">
            Regimental Coin page
          </a>{" "}
          for ordering information.
        </p>
      </>
    ),
  },
};

const inputClass =
  "w-full rounded border-2 border-black/15 px-3 py-2.5 text-sm transition-colors focus:border-redleg focus:outline-none focus:ring-2 focus:ring-redleg/20";
const labelClass = "mb-1.5 block text-sm font-semibold text-artillery";

export function SupportRequestForm() {
  const [requestType, setRequestType] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );

  const guidance = PROGRAM_GUIDANCE[requestType];

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

      <div>
        <label htmlFor="requestType" className={labelClass}>
          Support Program <span className="text-redleg">*</span>
        </label>
        <select
          id="requestType"
          name="requestType"
          required
          className={inputClass}
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
        >
          <option value="">Select support program...</option>
          {PROGRAM_GROUPS.map((g) => (
            <optgroup key={g.label} label={g.label}>
              {g.options.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <p className="mt-1 text-xs text-artillery-muted">
          See our{" "}
          <a
            href={CHARITABLE_PLAYBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-redleg underline"
          >
            Charitable Action Playbook
          </a>{" "}
          for details.
        </p>
      </div>

      {guidance && (
        <div className="rounded border-l-4 border-gold bg-amber-50/60 p-4 text-sm text-artillery-light [&_li]:ml-5 [&_li]:list-disc [&_ul]:mt-1">
          <h3 className="font-display text-base font-semibold text-redleg">
            {guidance.title}
          </h3>
          <div className="mt-2 space-y-1">{guidance.body}</div>
        </div>
      )}

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
