import { emailPreviewSrcDoc } from "@/lib/board/email-html";

export function SandboxedEmail({ html }: { html: string }) {
  return (
    <iframe
      className="h-[min(70vh,40rem)] w-full rounded-lg border border-neutral-200 bg-white"
      sandbox="allow-popups allow-popups-to-escape-sandbox"
      referrerPolicy="no-referrer"
      srcDoc={emailPreviewSrcDoc(html)}
      title="Email preview"
    />
  );
}
