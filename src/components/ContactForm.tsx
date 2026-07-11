"use client";

import { useState } from "react";

const CONTACT_ENDPOINT = "/api/contact";
const CONTACT_EMAIL = "president@gatorredleg.org";

const inputClass =
  "w-full rounded border-2 border-black/15 px-3 py-2.5 text-sm transition-colors focus:border-redleg focus:outline-none focus:ring-2 focus:ring-redleg/20";
const labelClass = "mb-1.5 block text-sm font-semibold text-artillery";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    setStatus("sending");

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded border-l-4 border-green-600 bg-green-50 p-6">
        <h3 className="font-display text-lg font-semibold text-green-800">
          Message sent
        </h3>
        <p className="mt-2 text-sm text-green-900">
          Thanks for reaching out — we&apos;ll get back to you at the email you
          provided.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-redleg underline"
        >
          Send another message
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
        <label htmlFor="name" className={labelClass}>
          Name <span className="text-redleg">*</span>
        </label>
        <input
          id="name"
          name="name"
          required
          className={inputClass}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email <span className="text-redleg">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClass}
          placeholder="your.email@example.com"
        />
        <p className="mt-1 text-xs text-artillery-muted">
          We&apos;ll reply to this address.
        </p>
      </div>

      <div>
        <label htmlFor="subject" className={labelClass}>
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          className={inputClass}
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message <span className="text-redleg">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={`${inputClass} min-h-32 resize-y`}
          placeholder="How can we help?"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded bg-redleg px-6 py-4 font-display font-semibold uppercase tracking-wide text-white transition-colors hover:bg-redleg-dark disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
