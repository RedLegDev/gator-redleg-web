const FROM = {
  email: "noreply@gatorredleg.org",
  name: "Gator Redleg Board",
};

/** v1 shared From for Respond (#39). Must be allowed on Email Sending. */
export const BOARD_RESPOND_FROM = {
  email: "board@gatorredleg.org",
  name: "Gator Redleg Board",
};

/** Shared intake — Reply-To so external replies hit Email Routing → Worker. */
export const BOARD_INBOX_ADDRESS = "board@gatorredleg.org";

/** Strip duplicate Re: prefixes, then prefix once. */
export function replySubject(subject: string): string {
  const cleaned = subject.replace(/^(re:\s*)+/i, "").trim() || "(no subject)";
  return `Re: ${cleaned}`;
}

export function buildOtpEmail(code: string): {
  subject: string;
  text: string;
  html: string;
} {
  return {
    subject: `${code} — Gator Redleg board sign-in code`,
    text: `Your Gator Redleg board sign-in code is:\n\n${code}\n\nEnter this code on the sign-in page. It expires in 15 minutes and works once.\n\nIf you did not ask for it, ignore this message.\n\nVESTIGIA NULLA RETRORSUM.`,
    html: `<p style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#1a1a1a">Your Gator Redleg board sign-in code is:</p><p style="font-family:ui-monospace,monospace;font-size:28px;letter-spacing:0.2em;font-weight:700;color:#141414">${escapeHtml(code)}</p><p style="font-family:system-ui,sans-serif;font-size:14px;color:#555">Enter this code on the sign-in page. It expires in 15 minutes and works once.</p><p style="font-family:system-ui,sans-serif;font-size:14px;color:#555">If you did not ask for it, ignore this message.</p><p style="font-family:system-ui,sans-serif;font-size:13px;color:#555"><em>VESTIGIA NULLA RETRORSUM.</em></p>`,
  };
}

export function buildOutboundReplyEmail(args: {
  body: string;
  senderName: string;
}): { text: string; html: string } {
  const text = `${args.body.trim()}\n\n—\n${args.senderName}\nGator Redleg Chapter, USFAA\nVESTIGIA NULLA RETRORSUM.`;
  const htmlBody = args.body
    .trim()
    .split("\n")
    .map((line) => (line ? escapeHtml(line) : "<br>"))
    .join("<br>");
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#1a1a1a">${htmlBody}</div><p style="margin-top:1.5em;color:#555;font-size:13px">—<br>${escapeHtml(args.senderName)}<br>Gator Redleg Chapter, USFAA<br><em>VESTIGIA NULLA RETRORSUM.</em></p>`;
  return { text, html };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export { FROM as BOARD_EMAIL_FROM };
