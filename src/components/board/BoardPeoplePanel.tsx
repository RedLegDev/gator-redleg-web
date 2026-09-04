"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Member } from "@/lib/board/types";

import { boardInputClass, boardButtonPrimaryClass } from "@/lib/board/ui";

export function BoardPeoplePanel({
  members: initialMembers,
  currentMemberId,
}: {
  members: Member[];
  currentMemberId: string;
}) {
  const router = useRouter();
  const [members, setMembers] = useState(initialMembers);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

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

  return (
    <div className="space-y-8">
      <p className="text-sm text-neutral-600">
        Board access is managed here. Active members can sign in with a magic link.
        Revoked members cannot log in but their past posts and tasks remain.
      </p>

      {error && (
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      )}

      <form onSubmit={addMember} className="space-y-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
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

      {/* Mobile: card list */}
      <ul className="space-y-3 md:hidden">
        {members.map((m) => (
          <li
            key={m.id}
            className={`rounded-lg border border-neutral-200 bg-white p-4 ${m.status === "revoked" ? "opacity-70" : ""}`}
          >
            <p className="font-medium text-artillery">{m.name}</p>
            <p className="mt-1 break-all font-mono text-xs text-neutral-600">{m.email}</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-sm capitalize text-neutral-500">{m.status}</span>
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
          </li>
        ))}
      </ul>

      {/* Desktop: table */}
      <div className="hidden overflow-x-auto rounded-lg border border-neutral-200 md:block">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs font-semibold uppercase tracking-wide text-neutral-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {members.map((m) => (
              <tr key={m.id} className={m.status === "revoked" ? "bg-neutral-50/80 text-neutral-500" : ""}>
                <td className="px-4 py-3 font-medium text-artillery">{m.name}</td>
                <td className="px-4 py-3 font-mono text-xs">{m.email}</td>
                <td className="px-4 py-3 capitalize">{m.status}</td>
                <td className="px-4 py-3">
                  {m.status === "active" ? (
                    <button
                      type="button"
                      className="text-xs font-semibold text-neutral-600 hover:underline"
                      onClick={() => patchMember(m.id, { status: "revoked" })}
                      disabled={m.id === currentMemberId}
                    >
                      Revoke
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="text-xs font-semibold text-redleg hover:underline"
                      onClick={() => patchMember(m.id, { status: "active" })}
                    >
                      Restore
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
