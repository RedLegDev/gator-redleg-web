// Shared, server-safe contact-form data + email rendering.
// The React form posts ContactData; the API route imports
// buildEmailHtml/buildEmailText/buildSubject to compose the email.
// Mirrors the support-request pattern (see src/lib/support-request.ts).

export type ContactData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function buildSubject(data: ContactData): string {
  const topic = data.subject.trim() || "General Inquiry";
  return `Contact Form: ${topic} - ${data.name}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildEmailHtml(data: ContactData): string {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const subject = escapeHtml(data.subject.trim() || "General Inquiry");
  const message = escapeHtml(data.message);

  return `
<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0; padding: 0;">
  <div style="background-color:#B22234;color:white;padding:20px;text-align:center;">
    <h2 style="margin:0;font-size:24px;">NEW CONTACT MESSAGE</h2>
    <p style="margin:5px 0;font-size:14px;color:#FFD700;">Gator Redleg Chapter, USFAA</p>
    <p style="margin:5px 0;font-size:12px;font-style:italic;">VESTIGIA NULLA RETRORSUM</p>
  </div>
  <table style="width:100%;border-collapse:collapse;margin:0;padding:20px;background-color:#f9f9f9;">
    <tr><td style="padding:8px 0;font-weight:bold;width:35%;">Date Received:</td><td style="padding:8px 0;">${currentDate}</td></tr>
    <tr><td style="padding:8px 0;font-weight:bold;">From:</td><td style="padding:8px 0;">${name}</td></tr>
    <tr><td style="padding:8px 0;font-weight:bold;">Contact Email:</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#B22234;">${email}</a></td></tr>
    <tr><td colspan="2" style="padding:15px 0 8px 0;"><div style="background-color:#FFF9E6;padding:12px;border-left:4px solid #FFD700;"><strong style="color:#B22234;">Subject:</strong><br>${subject}</div></td></tr>
    <tr><td colspan="2" style="padding:15px 0 0 0;"><div style="background-color:white;padding:15px;border-left:4px solid #B22234;"><strong style="color:#B22234;font-size:16px;">Message:</strong><p style="margin:10px 0 0 0;white-space:pre-wrap;line-height:1.5;">${message}</p></div></td></tr>
  </table>
  <div style="background-color:#333;color:white;padding:15px;text-align:center;">
    <p style="margin:0;font-size:14px;font-style:italic;">Never Leave a Fallen Comrade</p>
    <p style="margin:5px 0 0 0;font-size:12px;color:#999;">Gator Redleg Chapter · United States Field Artillery Association</p>
  </div>
</body></html>`.trim();
}

export function buildEmailText(data: ContactData): string {
  return [
    "NEW CONTACT MESSAGE — Gator Redleg Chapter, USFAA",
    "",
    `From: ${data.name}`,
    `Contact Email: ${data.email}`,
    `Subject: ${data.subject.trim() || "General Inquiry"}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}
