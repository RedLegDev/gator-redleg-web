import type { ActivityWithActor } from "@/lib/board/db";

export function activityHref(row: ActivityWithActor): string | null {
  if (row.object_type === "message") {
    return `/board/messages/${row.object_id}`;
  }
  if (row.object_type === "task_list") {
    return `/board/tasks/${row.object_id}`;
  }
  return null;
}

export function activityLabel(row: ActivityWithActor): string {
  const verb = row.verb.replace(/_/g, " ");
  return `${row.actor_name} ${verb} ${row.summary}`;
}
