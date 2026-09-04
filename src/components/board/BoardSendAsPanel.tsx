"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type {
  Member,
  SendIdentity,
  SendIdentityWithMember,
} from "@/lib/board/types";
import {
  boardInputClass,
  boardButtonPrimaryClass,
  boardInsetPanelClass,
  boardPanelClass,
} from "@/lib/board/ui";

type AddressGroup = {
  fromAddress: string;
  assignees: SendIdentityWithMember[];
};

export function BoardSendAsPanel({
  identities: initialIdentities,
  members,
}: {
  identities: SendIdentityWithMember[];
  members: Member[];
}) {
  const router = useRouter();
  const [identities, setIdentities] = useState(initialIdentities);
  const [fromAddress, setFromAddress] = useState("");
  const [memberId, setMemberId] = useState(members[0]?.id ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const groups = useMemo(() => {
    const map = new Map<string, SendIdentityWithMember[]>();
    for (const row of identities) {
      const key = row.from_address.toLowerCase();
      const list = map.get(key) ?? [];
      list.push(row);
      map.set(key, list);
    }
    return [...map.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(
        ([fromAddress, assignees]): AddressGroup => ({
          fromAddress,
          assignees,
        })
      );
  }, [identities]);

  async function assign(e: React.FormEvent) {
    e.preventDefault();
    if (!memberId || !fromAddress.trim()) return;
    setSaving(true);
    setError("");
    const res = await fetch(`/api/board/members/${memberId}/send-identities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fromAddress, isDefault: false }),
    });
    const json = (await res.json()) as {
      ok?: boolean;
      error?: string;
      data?: SendIdentity;
    };
    if (!res.ok || !json.data) {
      setError(json.error ?? "Could not assign address.");
      setSaving(false);
      return;
    }
    const created: SendIdentity = json.data;
    const member = members.find((m) => m.id === memberId);
    const row: SendIdentityWithMember = {
      ...created,
      member_name: member?.name ?? "Member",
      member_email: member?.email ?? "",
    };
    setIdentities((prev) => {
      const next = [
        ...prev.filter(
          (r) =>
            !(
              r.member_id === row.member_id &&
              r.from_address.toLowerCase() === row.from_address.toLowerCase()
            )
        ),
        row,
      ];
      next.sort(
        (a, b) =>
          a.from_address.localeCompare(b.from_address) ||
          a.member_name.localeCompare(b.member_name)
      );
      return next;
    });
    setFromAddress("");
    setSaving(false);
    router.refresh();
  }

  async function removeAssignee(row: SendIdentityWithMember) {
    setError("");
    const res = await fetch(
      `/api/board/members/${row.member_id}/send-identities?identityId=${encodeURIComponent(row.id)}`,
      { method: "DELETE" }
    );
    if (!res.ok) {
      const json = (await res.json()) as { error?: string };
      setError(json.error ?? "Could not remove assignment.");
      return;
    }
    setIdentities((rows) => rows.filter((r) => r.id !== row.id));
    router.refresh();
  }

  return (
    <div className="space-y-8">
      {error && (
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      )}

      <p className={`text-sm text-neutral-600 p-4 lg:p-5 ${boardInsetPanelClass}`}>
        Everyone can already send replies as <strong>board@gatorredleg.org</strong>.
        Assign role mailboxes here (president@, secretary@, …) so those people can
        pick them on Respond. Reply-To stays board@ so inbound stays on the hub.
      </p>

      <form
        onSubmit={assign}
        className={`space-y-3 p-4 lg:p-5 ${boardInsetPanelClass}`}
      >
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-neutral-700">
          Assign address
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">
              Chapter address
            </span>
            <input
              type="email"
              required
              className={boardInputClass}
              placeholder="president@gatorredleg.org"
              value={fromAddress}
              onChange={(e) => setFromAddress(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">
              Board member
            </span>
            <select
              className={boardInputClass}
              required
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
            >
              {members.length === 0 ? (
                <option value="">No active members</option>
              ) : (
                members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))
              )}
            </select>
          </label>
        </div>
        <button
          type="submit"
          disabled={saving || members.length === 0}
          className={`${boardButtonPrimaryClass} w-full sm:w-auto`}
        >
          {saving ? "Assigning…" : "Assign"}
        </button>
      </form>

      <div>
        <h2 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wide text-neutral-700">
          Assigned addresses
        </h2>
        {groups.length === 0 ? (
          <p className={`p-4 text-sm text-neutral-500 lg:p-5 ${boardPanelClass}`}>
            No role addresses yet. Assign one above.
          </p>
        ) : (
          <ul className="space-y-4">
            {groups.map((group) => (
              <li key={group.fromAddress} className={`p-4 lg:p-5 ${boardPanelClass}`}>
                <p className="font-mono text-sm font-semibold text-artillery sm:text-base">
                  {group.fromAddress}
                </p>
                <ul className="mt-3 divide-y divide-neutral-100">
                  {group.assignees.map((row) => (
                    <li
                      key={row.id}
                      className="flex flex-wrap items-center justify-between gap-2 py-2.5 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-artillery">{row.member_name}</p>
                        <p className="truncate text-sm text-neutral-500">
                          {row.member_email}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="text-xs font-semibold uppercase tracking-wide text-neutral-500 hover:text-artillery hover:underline"
                        onClick={() => void removeAssignee(row)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
