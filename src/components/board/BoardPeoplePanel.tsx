"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { Member, SendIdentity } from "@/lib/board/types";
import {
  boardInputClass,
  boardButtonPrimaryClass,
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
  /** President or officer — can assign send-as identities. */
  isPresident: boolean;
}) {
  const router = useRouter();
  const [members, setMembers] = useState(initialMembers);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [identitiesByMember, setIdentitiesByMember] = useState<
    Record<string, SendIdentity[]>
  >({});
  const [newFrom, setNewFrom] = useState<Record<string, string>>({});

  const loadIdentities = useCallback(async (memberId: string) => {
    const res = await fetch(`/api/board/members/${memberId}/send-identities`);
    const json = (await res.json()) as { data?: SendIdentity[] };
    if (res.ok && json.data) {
      setIdentitiesByMember((prev) => ({ ...prev, [memberId]: json.data! }));
    }
  }, []);

  useEffect(() => {
    if (!isPresident) return;
    for (const m of initialMembers) {
      void loadIdentities(m.id);
    }
  }, [isPresident, initialMembers, loadIdentities]);

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

  async function patchMember(
    id: string,
    patch: Partial<Pick<Member, "status">>
  ) {
    setError("");
    const res = await fetch(`/api/board/members/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
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
    router.refresh();
  }

  async function addIdentity(memberId: string) {
    const fromAddress = (newFrom[memberId] ?? "").trim();
    if (!fromAddress) return;
    setError("");
    const res = await fetch(`/api/board/members/${memberId}/send-identities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fromAddress, isDefault: false }),
    });
    const json = (await res.json()) as { ok?: boolean; error?: string };
    if (!res.ok) {
      setError(json.error ?? "Could not add From address.");
      return;
    }
    setNewFrom((prev) => ({ ...prev, [memberId]: "" }));
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
      setError(json.error ?? "Could not remove From address.");
      return;
    }
    await loadIdentities(memberId);
  }

  async function makeDefault(memberId: string, identityId: string) {
    setError("");
    const res = await fetch(`/api/board/members/${memberId}/send-identities`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identityId, action: "default" }),
    });
    if (!res.ok) {
      const json = (await res.json()) as { error?: string };
      setError(json.error ?? "Could not set default.");
      return;
    }
    await loadIdentities(memberId);
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-neutral-600">
        Board access is managed here. Active members can sign in with a one-time
        email code. Revoked members cannot log in but their past posts and tasks
        remain.
        {isPresident
          ? " Officers can also assign @gatorredleg.org send-as identities for Respond."
          : ""}
      </p>

      {error && (
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      )}

      <form
        onSubmit={addMember}
        className={`space-y-3 p-4 lg:p-6 ${boardInsetPanelClass}`}
      >
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-neutral-700">
          Add member
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">
              Email
            </span>
            <input
              type="email"
              required
              className={boardInputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">
              Name
            </span>
            <input
              className={boardInputClass}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={saving}
          className={`${boardButtonPrimaryClass} w-full sm:w-auto`}
        >
          {saving ? "Adding…" : "Add member"}
        </button>
      </form>

      <ul className="space-y-4">
        {members.map((m) => (
          <li
            key={m.id}
            className={`${boardPanelClass} p-4 lg:p-5 ${m.status === "revoked" ? "opacity-70" : ""}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium text-artillery">{m.name}</p>
                <p className="mt-1 break-all font-mono text-xs text-neutral-600">
                  {m.email}
                </p>
                <p className="mt-1 text-sm capitalize text-neutral-500">
                  {m.status}
                  {m.role === "president" ? " · president" : ""}
                </p>
              </div>
              {m.status === "active" ? (
                <button
                  type="button"
                  className="min-h-11 rounded px-3 text-sm font-semibold text-neutral-600 hover:bg-neutral-50"
                  onClick={() => patchMember(m.id, { status: "revoked" })}
                  disabled={m.id === currentMemberId}
                >
                  Revoke
                </button>
              ) : (
                <button
                  type="button"
                  className="min-h-11 rounded px-3 text-sm font-semibold text-redleg hover:bg-red-50"
                  onClick={() => patchMember(m.id, { status: "active" })}
                >
                  Restore
                </button>
              )}
            </div>

            {isPresident && m.status === "active" && (
              <div className="mt-4 border-t border-neutral-100 pt-4">
                <p className="font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Send as (@gatorredleg.org)
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  Everyone can also use board@. Reply-To stays board@.
                </p>
                <ul className="mt-2 space-y-1">
                  {(identitiesByMember[m.id] ?? []).map((sid) => (
                    <li
                      key={sid.id}
                      className="flex flex-wrap items-center gap-2 text-sm"
                    >
                      <span className="font-mono text-xs">{sid.from_address}</span>
                      {sid.is_default === 1 && (
                        <span className="rounded bg-gold/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-artillery">
                          Default
                        </span>
                      )}
                      {sid.is_default !== 1 && (
                        <button
                          type="button"
                          className="text-xs font-semibold text-neutral-500 hover:underline"
                          onClick={() => makeDefault(m.id, sid.id)}
                        >
                          Make default
                        </button>
                      )}
                      <button
                        type="button"
                        className="text-xs font-semibold text-redleg hover:underline"
                        onClick={() => removeIdentity(m.id, sid.id)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex flex-wrap gap-2">
                  <input
                    type="email"
                    className={`${boardInputClass} max-w-xs`}
                    placeholder="name@gatorredleg.org"
                    value={newFrom[m.id] ?? ""}
                    onChange={(e) =>
                      setNewFrom((prev) => ({
                        ...prev,
                        [m.id]: e.target.value,
                      }))
                    }
                  />
                  <button
                    type="button"
                    className={boardButtonPrimaryClass}
                    onClick={() => addIdentity(m.id)}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
