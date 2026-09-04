"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Member, SendIdentity } from "@/lib/board/types";
import {
  boardInputClass,
  boardButtonPrimaryClass,
  boardButtonSecondaryClass,
  boardInsetPanelClass,
  boardPanelClass,
} from "@/lib/board/ui";

export function BoardPeoplePanel({
  members: initialMembers,
  currentMemberId,
  isPresident,
}: {
  members: Member[];
  currentMemberId: string;
  /** President or officer — can assign chapter From addresses. */
  isPresident: boolean;
}) {
  const router = useRouter();
  const [members, setMembers] = useState(initialMembers);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [showRemoved, setShowRemoved] = useState(false);
  const [emailOpenId, setEmailOpenId] = useState<string | null>(null);
  const [identities, setIdentities] = useState<SendIdentity[]>([]);
  const [identitiesLoading, setIdentitiesLoading] = useState(false);
  const [newFrom, setNewFrom] = useState("");

  const removedCount = members.filter((m) => m.status === "revoked").length;
  const visibleMembers = showRemoved
    ? members
    : members.filter((m) => m.status !== "revoked");

  async function loadIdentities(memberId: string) {
    setIdentitiesLoading(true);
    const res = await fetch(`/api/board/members/${memberId}/send-identities`);
    const json = (await res.json()) as { data?: SendIdentity[] };
    setIdentities(res.ok && json.data ? json.data : []);
    setIdentitiesLoading(false);
  }

  async function toggleEmailPanel(memberId: string) {
    if (emailOpenId === memberId) {
      setEmailOpenId(null);
      setNewFrom("");
      return;
    }
    setEmailOpenId(memberId);
    setNewFrom("");
    await loadIdentities(memberId);
  }

  async function addMember(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/board/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    });
    const json = (await res.json()) as {
      ok?: boolean;
      error?: string;
      data?: Member;
    };
    if (!res.ok || !json.data) {
      setError(json.error ?? "Could not add member.");
      setSaving(false);
      return;
    }
    setMembers((m) =>
      [...m.filter((x) => x.id !== json.data!.id), json.data!].sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    );
    setEmail("");
    setName("");
    setSaving(false);
    router.refresh();
  }

  async function setAccess(id: string, status: "active" | "revoked") {
    setError("");
    const res = await fetch(`/api/board/members/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const json = (await res.json()) as {
      ok?: boolean;
      error?: string;
      data?: Member;
    };
    if (!res.ok || !json.data) {
      setError(json.error ?? "Update failed.");
      return;
    }
    setMembers((m) => m.map((x) => (x.id === id ? json.data! : x)));
    if (status === "revoked" && emailOpenId === id) setEmailOpenId(null);
    router.refresh();
  }

  async function addIdentity(memberId: string) {
    const fromAddress = newFrom.trim();
    if (!fromAddress) return;
    setError("");
    const res = await fetch(`/api/board/members/${memberId}/send-identities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromAddress,
        isDefault: identities.length === 0,
      }),
    });
    const json = (await res.json()) as { ok?: boolean; error?: string };
    if (!res.ok) {
      setError(json.error ?? "Could not add address.");
      return;
    }
    setNewFrom("");
    await loadIdentities(memberId);
  }

  async function removeIdentity(memberId: string, identityId: string) {
    setError("");
    const res = await fetch(
      `/api/board/members/${memberId}/send-identities?identityId=${encodeURIComponent(identityId)}`,
      { method: "DELETE" }
    );
    if (!res.ok) {
      const json = (await res.json()) as { error?: string };
      setError(json.error ?? "Could not remove address.");
      return;
    }
    await loadIdentities(memberId);
  }

  return (
    <div className="space-y-8">
      {error && (
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      )}

      <form
        onSubmit={addMember}
        className={`space-y-3 p-4 lg:p-5 ${boardInsetPanelClass}`}
      >
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-neutral-700">
          Add someone
        </h2>
        <p className="text-sm text-neutral-600">
          They sign in with a code emailed to this address.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">
              Name
            </span>
            <input
              className={boardInputClass}
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">
              Email
            </span>
            <input
              type="email"
              required
              autoComplete="email"
              className={boardInputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={saving}
          className={`${boardButtonPrimaryClass} w-full sm:w-auto`}
        >
          {saving ? "Adding…" : "Add"}
        </button>
      </form>

      <div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-neutral-700">
            Who can sign in
          </h2>
          {removedCount > 0 && (
            <button
              type="button"
              className="text-sm font-semibold text-neutral-500 underline-offset-2 hover:underline"
              onClick={() => setShowRemoved((v) => !v)}
              aria-pressed={showRemoved}
            >
              {showRemoved
                ? "Hide removed"
                : `Show removed (${removedCount})`}
            </button>
          )}
        </div>

        <ul className={`divide-y divide-neutral-100 ${boardPanelClass}`}>
          {visibleMembers.map((m) => {
            const isSelf = m.id === currentMemberId;
            const removed = m.status === "revoked";
            const emailOpen = emailOpenId === m.id;

            return (
              <li key={m.id} className={removed ? "bg-neutral-50/80" : undefined}>
                <div className="flex flex-wrap items-center gap-3 px-4 py-3.5 lg:px-5">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-artillery">
                      {m.name}
                      {m.role === "president" ? (
                        <span className="ml-2 text-xs font-normal text-neutral-500">
                          President
                        </span>
                      ) : null}
                      {isSelf ? (
                        <span className="ml-2 text-xs font-normal text-neutral-500">
                          (you)
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-0.5 truncate text-sm text-neutral-600">
                      {m.email}
                    </p>
                    {removed ? (
                      <p className="mt-1 text-xs font-semibold text-neutral-500">
                        No access
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {isPresident && !removed ? (
                      <button
                        type="button"
                        className={`${boardButtonSecondaryClass} !min-h-10 !px-3 !text-xs`}
                        onClick={() => void toggleEmailPanel(m.id)}
                        aria-expanded={emailOpen}
                      >
                        {emailOpen ? "Done" : "Chapter email"}
                      </button>
                    ) : null}
                    {removed ? (
                      <button
                        type="button"
                        className={`${boardButtonPrimaryClass} !min-h-10 !px-3 !text-xs`}
                        onClick={() => void setAccess(m.id, "active")}
                      >
                        Give access
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="min-h-10 rounded-lg px-3 text-xs font-semibold uppercase tracking-wide text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 disabled:opacity-40"
                        onClick={() => void setAccess(m.id, "revoked")}
                        disabled={isSelf}
                        title={
                          isSelf
                            ? "You can’t remove your own access"
                            : "They won’t be able to sign in"
                        }
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>

                {emailOpen && isPresident && !removed ? (
                  <div className="border-t border-neutral-100 bg-neutral-50/60 px-4 py-4 lg:px-5">
                    <p className="text-sm text-neutral-600">
                      Optional. Lets them send chapter replies from a personal
                      address (e.g. president@…). Everyone can already use
                      board@.
                    </p>
                    {identitiesLoading ? (
                      <p className="mt-3 text-sm text-neutral-500">Loading…</p>
                    ) : (
                      <ul className="mt-3 space-y-2">
                        {identities.length === 0 ? (
                          <li className="text-sm text-neutral-500">
                            None yet — they send as board@.
                          </li>
                        ) : (
                          identities.map((sid) => (
                            <li
                              key={sid.id}
                              className="flex flex-wrap items-center justify-between gap-2 text-sm"
                            >
                              <span className="font-mono text-xs sm:text-sm">
                                {sid.from_address}
                              </span>
                              <button
                                type="button"
                                className="text-xs font-semibold text-redleg hover:underline"
                                onClick={() =>
                                  void removeIdentity(m.id, sid.id)
                                }
                              >
                                Remove
                              </button>
                            </li>
                          ))
                        )}
                      </ul>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <input
                        type="email"
                        className={`${boardInputClass} max-w-sm`}
                        placeholder="name@gatorredleg.org"
                        value={newFrom}
                        onChange={(e) => setNewFrom(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            void addIdentity(m.id);
                          }
                        }}
                      />
                      <button
                        type="button"
                        className={boardButtonPrimaryClass}
                        onClick={() => void addIdentity(m.id)}
                      >
                        Add address
                      </button>
                    </div>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
