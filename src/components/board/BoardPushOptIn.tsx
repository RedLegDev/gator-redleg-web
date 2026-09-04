"use client";

import { useEffect, useState } from "react";
import { boardButtonPrimaryClass, boardButtonSecondaryClass } from "@/lib/board/ui";

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

export function BoardPushOptIn() {
  const [status, setStatus] = useState<
    "loading" | "unsupported" | "prompt" | "subscribed" | "dismissed" | "error"
  >("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setStatus("unsupported");
      return;
    }
    if (localStorage.getItem("board_push_dismissed") === "1") {
      setStatus("dismissed");
      return;
    }
    void (async () => {
      try {
        const reg = await navigator.serviceWorker.register("/board-sw.js", {
          scope: "/board",
        });
        const sub = await reg.pushManager.getSubscription();
        setStatus(sub ? "subscribed" : "prompt");
      } catch {
        setStatus("unsupported");
      }
    })();
  }, []);

  async function enable() {
    setError(null);
    try {
      const keyRes = await fetch("/api/board/push/subscribe");
      const keyJson = (await keyRes.json()) as {
        ok?: boolean;
        data?: { publicKey: string };
        error?: string;
      };
      if (!keyRes.ok || !keyJson.data?.publicKey) {
        setError(keyJson.error ?? "Push not configured on the server.");
        setStatus("error");
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setError("Notifications blocked in the browser.");
        setStatus("error");
        return;
      }

      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          keyJson.data.publicKey
        ) as BufferSource,
      });
      const json = sub.toJSON();
      const res = await fetch("/api/board/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
      });
      if (!res.ok) throw new Error("subscribe failed");
      setStatus("subscribed");
    } catch {
      setError("Could not enable notifications.");
      setStatus("error");
    }
  }

  function dismiss() {
    localStorage.setItem("board_push_dismissed", "1");
    setStatus("dismissed");
  }

  if (
    status === "loading" ||
    status === "unsupported" ||
    status === "dismissed" ||
    status === "subscribed"
  ) {
    return null;
  }

  return (
    <div className="mb-4 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 lg:mb-6">
      <p className="font-heading text-xs font-semibold uppercase tracking-wide text-artillery">
        Enable notifications
      </p>
      <p className="mt-1 text-sm text-neutral-700">
        Get a push when chapter email lands on the board — helpful on phone.
      </p>
      {error && (
        <p className="mt-2 text-sm text-redleg" role="alert">
          {error}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className={boardButtonPrimaryClass} onClick={enable}>
          Enable
        </button>
        <button type="button" className={boardButtonSecondaryClass} onClick={dismiss}>
          Not now
        </button>
      </div>
    </div>
  );
}
