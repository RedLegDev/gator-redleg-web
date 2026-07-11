"use client";

import { useState } from "react";
import { CHARITABLE_PLAYBOOK_URL } from "@/lib/nav";

const WEBHOOK_URL = "https://hook.us1.make.com/amme7klajsfp0ukxlpdhi6o5sjdu1ypb";
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

const PROGRAM_GROUPS = [
  {
    label: "Unit Support Programs",
    options: [
      ["shake-and-bake", "Shake and Bake — Unit Financial Support ($250–$1,000)"],
      ["coordinated-illumination", "Coordinated Illumination — Membership/Marketing Events ($100–$200)"],
      ["sead", "SEAD — Unit/Chapter Fundraising (Silent Auctions)"],
    ],
  },
  {
    label: "Individual Support Programs",
    options: [
      ["quick-smoke", "Quick Smoke — Immediate Financial Support ($250–$1,000)"],
      ["fire-mission", "Fire Mission — Soldier/NCO of Year Gifts (up to $150)"],
      ["end-of-mission", "End of Mission — Regimental Coins (ETS/PCS)"],
    ],
  },
  {
    label: "Other",
    options: [
      ["scholarship", "Scholarship Request"],
      ["other", "Other (Not covered by existing programs)"],
    ],
  },
] as const;

const inputClass =
  "w-full rounded border-2 border-black/15 px-3 py-2.5 text-sm transition-colors focus:border-redleg focus:outline-none focus:ring-2 focus:ring-redleg/20";
const labelClass = "mb-1.5 block text-sm font-semibold text-artillery";

function optionLabel(value: string): string {
  for (const g of PROGRAM_GROUPS) {
    const found = g.options.find(([v]) => v === value);
    if (found) return found[1];
  }
  return value;
}

function buildEmailHtml(data: {
  requesterName: string;
  unit: string;
  email: string;
  eventDate: string;
  requestType: string;
  amount: string;
  description: string;
}): string {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const eventDate = new Date(data.eventDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysUntil = Math.ceil(
    (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  const formattedEventDate = eventDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  let urgencyLabel = "";
  let urgencyColor = "#666";
  if (daysUntil <= 7) {
    urgencyLabel = "URGENT - Within 7 days";
    urgencyColor = "#B22234";
  } else if (daysUntil <= 14) {
    urgencyLabel = "High Priority - Within 2 weeks";
    urgencyColor = "#FF6B00";
  } else if (daysUntil <= 30) {
    urgencyLabel = "Standard - Within 30 days";
    urgencyColor = "#FFD700";
  }

  const amountRow = data.amount
    ? `<tr><td style="padding:8px 0;font-weight:bold;">Amount Requested:</td><td style="padding:8px 0;font-size:18px;color:#B22234;font-weight:bold;">$${parseFloat(
        data.amount
      ).toFixed(2)}</td></tr>`
    : "";

  return `
<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0; padding: 0;">
  <div style="background-color:#B22234;color:white;padding:20px;text-align:center;">
    <h2 style="margin:0;font-size:24px;">NEW SUPPORT REQUEST</h2>
    <p style="margin:5px 0;font-size:14px;color:#FFD700;">Gator Redleg Chapter, USFAA</p>
    <p style="margin:5px 0;font-size:12px;font-style:italic;">VESTIGIA NULLA RETRORSUM</p>
  </div>
  <table style="width:100%;border-collapse:collapse;margin:0;padding:20px;background-color:#f9f9f9;">
    <tr><td style="padding:8px 0;font-weight:bold;width:35%;">Date Submitted:</td><td style="padding:8px 0;">${currentDate}</td></tr>
    <tr><td style="padding:8px 0;font-weight:bold;">Requester:</td><td style="padding:8px 0;">${data.requesterName}</td></tr>
    <tr><td style="padding:8px 0;font-weight:bold;">Unit/Organization:</td><td style="padding:8px 0;">${data.unit}</td></tr>
    <tr><td style="padding:8px 0;font-weight:bold;">Contact Email:</td><td style="padding:8px 0;"><a href="mailto:${data.email}" style="color:#B22234;">${data.email}</a></td></tr>
    <tr><td style="padding:8px 0;font-weight:bold;">Event/Need Date:</td><td style="padding:8px 0;">${formattedEventDate} <span style="color:#666;">(${daysUntil} days)</span>${urgencyLabel ? `<br><strong style="color:${urgencyColor};">${urgencyLabel}</strong>` : ""}</td></tr>
    <tr><td colspan="2" style="padding:15px 0 8px 0;"><div style="background-color:#FFF9E6;padding:12px;border-left:4px solid #FFD700;"><strong style="color:#B22234;">Support Program:</strong><br>${optionLabel(data.requestType)}</div></td></tr>
    ${amountRow}
    <tr><td colspan="2" style="padding:15px 0 0 0;"><div style="background-color:white;padding:15px;border-left:4px solid #B22234;"><strong style="color:#B22234;font-size:16px;">Request Details:</strong><p style="margin:10px 0 0 0;white-space:pre-wrap;line-height:1.5;">${data.description}</p></div></td></tr>
    <tr><td colspan="2" style="padding:15px 0 0 0;text-align:center;font-size:13px;color:#666;"><a href="${CHARITABLE_PLAYBOOK_URL}" style="color:#B22234;font-weight:bold;">Review Charitable Action Playbook</a></td></tr>
  </table>
  <div style="background-color:#333;color:white;padding:15px;text-align:center;">
    <p style="margin:0;font-size:14px;font-style:italic;">Never Leave a Fallen Comrade</p>
    <p style="margin:5px 0 0 0;font-size:12px;color:#999;">Gator Redleg Chapter · United States Field Artillery Association</p>
  </div>
</body></html>`.trim();
}

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
    const programName = optionLabel(data.requestType).split(" — ")[0];
    const payload = {
      address: CONTACT_EMAIL,
      subject: `Support Request: ${programName} - ${data.requesterName}`,
      message: buildEmailHtml(data),
    };

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
