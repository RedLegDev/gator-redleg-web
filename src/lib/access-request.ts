// Shared, server-safe access-request data + email rendering.
// The React form posts AccessRequestData; the API route imports
// buildEmailHtml/buildEmailText/buildBoardSubject to compose the board post.

export type AccessRequestData = {
  name: string;
  email: string;
  rank: string;
  unit: string;
  reason: string;
};

export function buildBoardSubject(data: AccessRequestData): string {
  return data.name;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildEmailHtml(data: AccessRequestData): string {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const rank = escapeHtml(data.rank);
  const unit = escapeHtml(data.unit);
  const reason = escapeHtml(data.reason);

  const rankRow = data.rank
    ? `<tr><td style="padding:8px 0;font-weight:bold;">Rank:</td><td style="padding:8px 0;">${rank}</td></tr>`
    : "";

  return `
<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0; padding: 0;">
  <div style="background-color:#B22234;color:white;padding:20px;text-align:center;">
    <h2 style="margin:0;font-size:24px;">BOARD ACCESS REQUEST</h2>
    <p style="margin:5px 0;font-size:14px;color:#FFD700;">Gator Redleg Chapter, USFAA</p>
    <p style="margin:5px 0;font-size:12px;font-style:italic;">VESTIGIA NULLA RETRORSUM</p>
  </div>
  <table style="width:100%;border-collapse:collapse;margin:0;padding:20px;background-color:#f9f9f9;">
    <tr><td style="padding:8px 0;font-weight:bold;width:35%;">Date Submitted:</td><td style="padding:8px 0;">${currentDate}</td></tr>
    <tr><td style="padding:8px 0;font-weight:bold;">Name:</td><td style="padding:8px 0;">${name}</td></tr>
    <tr><td style="padding:8px 0;font-weight:bold;">Email:</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#B22234;">${email}</a></td></tr>
    ${rankRow}
    <tr><td style="padding:8px 0;font-weight:bold;">Unit / chapter role:</td><td style="padding:8px 0;">${unit}</td></tr>
    <tr><td colspan="2" style="padding:15px 0 0 0;"><div style="background-color:white;padding:15px;border-left:4px solid #B22234;"><strong style="color:#B22234;font-size:16px;">Why they need access:</strong><p style="margin:10px 0 0 0;white-space:pre-wrap;line-height:1.5;">${reason}</p></div></td></tr>
  </table>
  <div style="background-color:#333;color:white;padding:15px;text-align:center;">
    <p style="margin:0;font-size:14px;font-style:italic;">Add them at /board/people if they should have access.</p>
    <p style="margin:5px 0 0 0;font-size:12px;color:#999;">Gator Redleg Chapter · United States Field Artillery Association</p>
  </div>
</body></html>`.trim();
}

export function buildEmailText(data: AccessRequestData): string {
  const lines = [
    "BOARD ACCESS REQUEST — Gator Redleg Chapter, USFAA",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
  ];
  if (data.rank) {
    lines.push(`Rank: ${data.rank}`);
  }
  lines.push(
    `Unit / chapter role: ${data.unit}`,
    "",
    "Why they need access:",
    data.reason
  );
  return lines.join("\n");
}
