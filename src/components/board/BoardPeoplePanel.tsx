"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Member, MemberRole } from "@/lib/board/types";

const inputClass =
  "w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-redleg focus:outline-none focus:ring-2 focus:ring-redleg/30";

const roleLabel: Record<MemberRole, string> = {
  president: "President",
  officer: "Officer",
  member: "Member",
};

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
  const [role, setRole] = useState<MemberRole>("member");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function addMember(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/board/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, role }),
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
    setRole("member");
    setSaving(false);
    router.refresh();
  }

  async function patchMember(
    id: string,
    patch: Partial<Pick<Member, "name" | "role" | "status">>
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
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">
              Email
            </span>
            <input
              type="email"
              required
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">
              Name
            </span>
            <input
              className={inputClass}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">
              Role
            </span>
            <select
              className={inputClass}
              value={role}
              onChange={(e) => setRole(e.target.value as MemberRole)}
            >
              <option value="member">Member</option>
              <option value="officer">Officer</option>
              <option value="president">President</option>
            </select>
          </label>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-redleg px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white hover:bg-redleg-dark disabled:opacity-60"
        >
          {saving ? "Adding…" : "Add member"}
        </button>
      </form>

      <div className="overflow-x-auto rounded-lg border border-neutral-200">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs font-semibold uppercase tracking-wide text-neutral-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {members.map((m) => (
              <tr key={m.id} className={m.status === "revoked" ? "bg-neutral-50/80 text-neutral-500" : ""}>
                <td className="px-4 py-3 font-medium text-artillery">{m.name}</td>
                <td className="px-4 py-3 font-mono text-xs">{m.email}</td>
                <td className="px-4 py-3">{roleLabel[m.role]}</td>
                <td className="px-4 py-3 capitalize">{m.status}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {m.status === "active" && m.role !== "president" && (
                      <button
                        type="button"
                        className="text-xs font-semibold text-redleg hover:underline"
                        onClick={() => patchMember(m.id, { role: "president" })}
                      >
                        Make president
                      </button>
                    )}
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
