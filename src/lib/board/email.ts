const FROM = {
  email: "noreply@gatorredleg.org",
  name: "Gator Redleg Board",
};

export function buildMagicLinkEmail(link: string): {
  subject: string;
  text: string;
  html: string;
} {
  return {
    subject: "Your Gator Redleg board sign-in link",
    text: `Sign in to the Gator Redleg board hub:\n\n${link}\n\nThis link works once and expires in 15 minutes. If you did not ask for it, ignore this message.\n\nVESTIGIA NULLA RETRORSUM.`,
    html: `<p>Sign in to the Gator Redleg board hub:</p><p><a href="${link}">${link}</a></p><p>This link works once and expires in 15 minutes. If you did not ask for it, ignore this message.</p><p><em>VESTIGIA NULLA RETRORSUM.</em></p>`,
  };
}

export { FROM as BOARD_EMAIL_FROM };
