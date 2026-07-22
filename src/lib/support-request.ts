import { CHARITABLE_PLAYBOOK_URL } from "@/lib/nav";

// Shared, server-safe support-request data + email rendering.
// The React form imports PROGRAM_GROUPS for the program picker; the API route
// imports optionLabel/buildEmailHtml/buildSubject to compose the email.

export type SupportRequestData = {
  requesterName: string;
  unit: string;
  email: string;
  eventDate: string;
  requestType: string;
  amount: string;
  description: string;
};

export type SupportProgram = {
  value: string;
  /** Short name, e.g. "Shake and Bake" */
  name: string;
  /** One-line purpose shown on the card title row */
  summary: string;
  /** What the program covers */
  description: string;
  /** Funding tiers or cost notes; empty for open-ended options */
  tiers: string[];
  /** Hard limits / eligibility requirements the requester must meet */
  restrictions: string[];
};

export type SupportProgramGroup = {
  label: string;
  options: SupportProgram[];
};

export const PROGRAM_GROUPS: SupportProgramGroup[] = [
  {
    label: "Unit Support Programs",
    options: [
      {
        value: "shake-and-bake",
        name: "Shake and Bake",
        summary: "Unit financial support",
        description:
          "Units identify a specific need (events, shirts, morale items) and the Chapter matches that request. The Regimental crest is added to funded items where possible.",
        tiers: [
          "$250 — Small unit event or morale item",
          "$500 — Medium-sized unit event",
          "$1,000 — Major event with 200+ attendees",
          "Specific line-item match (unit still matches the cost)",
        ],
        restrictions: [
          "Final amount is set by Executive Board vote",
          "Amounts are guidelines, not guarantees",
        ],
      },
      {
        value: "coordinated-illumination",
        name: "Coordinated Illumination",
        summary: "Membership / marketing events",
        description:
          "Chapter support for unit events where we can run a membership table and attract future donors or members — Family Days, Employer Days, recruiting events.",
        tiers: [
          "$100 — Membership goal of 5–10 USFAA members + family/employer targets",
          "$200 — Membership goal of 8–12 USFAA members + family/employer targets",
        ],
        restrictions: [
          "Request must include a concrete membership goal",
          "Must include specific targets for family or employer participation",
        ],
      },
      {
        value: "sead",
        name: "SEAD",
        summary: "Unit / Chapter fundraising",
        description:
          "Chapter donates silent-auction items for unit holiday parties and similar fundraisers. Proceeds are split between the Chapter and the unit.",
        tiers: [],
        restrictions: [
          "Chapter provides auction items; the unit runs the auction",
          "Proceeds are divided between Chapter and unit",
          "Scope decided case-by-case by the Executive Board",
        ],
      },
    ],
  },
  {
    label: "Individual Support Programs",
    options: [
      {
        value: "quick-smoke",
        name: "Quick Smoke",
        summary: "Immediate financial hardship support",
        description:
          "Short-notice assistance for bills, travel, or other justifiable expenses. Board approval required.",
        tiers: [
          "$250 — Short-term hardship (no FL NG Foundation request required)",
          "$500 — Short-term hardship (no FL NG Foundation request required)",
          "$750 — Prolonged hardship (FL NG Foundation request required first)",
          "$1,000 — Significant/enduring hardship (FL NG Foundation request required first)",
        ],
        restrictions: [
          "Requests over $500 require a prior Florida National Guard Foundation application",
          "Final amount is set by Executive Board vote",
        ],
      },
      {
        value: "fire-mission",
        name: "Fire Mission",
        summary: "Soldier / NCO of the Year gifts",
        description:
          "Financial support for recognition gifts for battalion Soldier or NCO of the Year recipients.",
        tiers: ["Up to $150 per recipient"],
        restrictions: [
          "Capped at $150 per recipient",
          "Must fall within established recognition guidelines",
          "Executive Board votes on each request",
        ],
      },
      {
        value: "end-of-mission",
        name: "End of Mission",
        summary: "Regimental coins (ETS / PCS)",
        description:
          "Regimental coins as parting gifts for E-5 and below who are ETSing or PCSing outside the regiment.",
        tiers: ["$15 per coin"],
        restrictions: [
          "E-5 and below only",
          "ETS or PCS outside the regiment",
          "See the Regimental Coin page for ordering details",
        ],
      },
    ],
  },
  {
    label: "Other",
    options: [
      {
        value: "scholarship",
        name: "Scholarship Request",
        summary: "Educational support",
        description:
          "Scholarship or education-related assistance not covered by another program. Describe the need and any existing awards in your request.",
        tiers: [],
        restrictions: [
          "Considered case-by-case",
          "Subject to available funds and Executive Board vote",
        ],
      },
      {
        value: "other",
        name: "Other",
        summary: "Not covered by existing programs",
        description:
          "Use this when your need does not fit a named program. Be specific about purpose, amount, and timeline so the board can evaluate it.",
        tiers: [],
        restrictions: [
          "Not a substitute for programs with clearer eligibility when one applies",
          "Subject to available funds and Executive Board vote",
        ],
      },
    ],
  },
];

export function findProgram(value: string): SupportProgram | undefined {
  for (const g of PROGRAM_GROUPS) {
    const found = g.options.find((o) => o.value === value);
    if (found) return found;
  }
  return undefined;
}

/** Human-readable label for emails / summaries. */
export function optionLabel(value: string): string {
  const program = findProgram(value);
  if (!program) return value;
  return `${program.name} — ${program.summary}`;
}

export function isValidProgram(value: string): boolean {
  return Boolean(findProgram(value));
}

export function buildSubject(data: SupportRequestData): string {
  const program = findProgram(data.requestType);
  const programName = program?.name ?? data.requestType;
  return `Support Request: ${programName} - ${data.requesterName}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildEmailHtml(data: SupportRequestData): string {
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

  const requesterName = escapeHtml(data.requesterName);
  const unit = escapeHtml(data.unit);
  const email = escapeHtml(data.email);
  const description = escapeHtml(data.description);

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
    <tr><td style="padding:8px 0;font-weight:bold;">Requester:</td><td style="padding:8px 0;">${requesterName}</td></tr>
    <tr><td style="padding:8px 0;font-weight:bold;">Unit/Organization:</td><td style="padding:8px 0;">${unit}</td></tr>
    <tr><td style="padding:8px 0;font-weight:bold;">Contact Email:</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#B22234;">${email}</a></td></tr>
    <tr><td style="padding:8px 0;font-weight:bold;">Event/Need Date:</td><td style="padding:8px 0;">${formattedEventDate} <span style="color:#666;">(${daysUntil} days)</span>${urgencyLabel ? `<br><strong style="color:${urgencyColor};">${urgencyLabel}</strong>` : ""}</td></tr>
    <tr><td colspan="2" style="padding:15px 0 8px 0;"><div style="background-color:#FFF9E6;padding:12px;border-left:4px solid #FFD700;"><strong style="color:#B22234;">Support Program:</strong><br>${escapeHtml(optionLabel(data.requestType))}</div></td></tr>
    ${amountRow}
    <tr><td colspan="2" style="padding:15px 0 0 0;"><div style="background-color:white;padding:15px;border-left:4px solid #B22234;"><strong style="color:#B22234;font-size:16px;">Request Details:</strong><p style="margin:10px 0 0 0;white-space:pre-wrap;line-height:1.5;">${description}</p></div></td></tr>
    <tr><td colspan="2" style="padding:15px 0 0 0;text-align:center;font-size:13px;color:#666;"><a href="${CHARITABLE_PLAYBOOK_URL}" style="color:#B22234;font-weight:bold;">Review Charitable Action Playbook</a></td></tr>
  </table>
  <div style="background-color:#333;color:white;padding:15px;text-align:center;">
    <p style="margin:0;font-size:14px;font-style:italic;">Never Leave a Fallen Comrade</p>
    <p style="margin:5px 0 0 0;font-size:12px;color:#999;">Gator Redleg Chapter · United States Field Artillery Association</p>
  </div>
</body></html>`.trim();
}

export function buildEmailText(data: SupportRequestData): string {
  const lines = [
    "NEW SUPPORT REQUEST — Gator Redleg Chapter, USFAA",
    "",
    `Requester: ${data.requesterName}`,
    `Unit/Organization: ${data.unit}`,
    `Contact Email: ${data.email}`,
    `Event/Need Date: ${data.eventDate}`,
    `Support Program: ${optionLabel(data.requestType)}`,
  ];
  if (data.amount) {
    lines.push(`Amount Requested: $${parseFloat(data.amount).toFixed(2)}`);
  }
  lines.push("", "Request Details:", data.description);
  return lines.join("\n");
}
