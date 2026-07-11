import { CHARITABLE_PLAYBOOK_URL } from "@/lib/nav";

// Shared, server-safe support-request data + email rendering.
// The React form imports PROGRAM_GROUPS for its <select>; the API route
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

export const PROGRAM_GROUPS = [
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

export function optionLabel(value: string): string {
  for (const g of PROGRAM_GROUPS) {
    const found = g.options.find(([v]) => v === value);
    if (found) return found[1];
  }
  return value;
}

export function buildSubject(data: SupportRequestData): string {
  const programName = optionLabel(data.requestType).split(" — ")[0];
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
