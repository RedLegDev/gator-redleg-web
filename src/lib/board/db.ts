import type {
  CommentRow,
  CommentWithAuthor,
  MessageRow,
  MessageWithMeta,
  TaskListRow,
  TaskListWithCounts,
  TaskRow,
  TaskWithMeta,
} from "./types";
import { newId, nowSec } from "./ids";

export {
  bootstrapMembersFromSecrets,
  canMemberLogin,
  countActiveMembers,
  countActiveMembersExcept,
  countActivePresidents,
  createMember,
  getActiveMemberByEmail,
  getMemberByEmail,
  getMemberById,
  listActiveMembers,
  listAllMembers,
  touchMemberLastSeen,
  updateMember,
  upsertMember,
} from "./members";

export { listActiveMembers as listMembers } from "./members";

export async function countRecentLoginRequests(
  db: D1Database,
  email: string,
  sinceSec: number
): Promise<number> {
  const row = await db
    .prepare(
      `SELECT COUNT(*) AS n FROM login_tokens WHERE email = ?1 AND created_at >= ?2`
    )
    .bind(email.trim().toLowerCase(), sinceSec)
    .first<{ n: number }>();
  return row?.n ?? 0;
}

export async function insertLoginToken(
  db: D1Database,
  tokenHash: string,
  email: string,
  expiresAt: number,
  createdAt: number
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO login_tokens (token_hash, email, expires_at, used_at, created_at)
       VALUES (?1, ?2, ?3, NULL, ?4)`
    )
    .bind(tokenHash, email, expiresAt, createdAt)
    .run();
}

export async function consumeLoginToken(
  db: D1Database,
  tokenHash: string,
  at: number
): Promise<string | null> {
  const result = await db
    .prepare(
      `UPDATE login_tokens SET used_at = ?2
        WHERE token_hash = ?1 AND used_at IS NULL AND expires_at > ?2`
    )
    .bind(tokenHash, at)
    .run();
  if ((result.meta.changes ?? 0) !== 1) return null;

  const row = await db
    .prepare(`SELECT email FROM login_tokens WHERE token_hash = ?1`)
    .bind(tokenHash)
    .first<{ email: string }>();
  return row?.email ?? null;
}

export async function recordActivity(
  db: D1Database,
  actorId: string,
  verb: string,
  objectType: string,
  objectId: string,
  summary: string
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO activity (id, actor_id, verb, object_type, object_id, summary, created_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
    )
    .bind(newId(), actorId, verb, objectType, objectId, summary, nowSec())
    .run();
}

export async function listMessages(
  db: D1Database,
  limit = 50
): Promise<MessageWithMeta[]> {
  const { results } = await db
    .prepare(
      `SELECT m.id, m.subject, m.body_md, m.author_id, m.pinned, m.status,
              m.created_at, m.updated_at,
              a.name AS author_name,
              (SELECT COUNT(*) FROM comments c
                 WHERE c.parent_type = 'message' AND c.parent_id = m.id) AS comment_count
       FROM messages m
       JOIN members a ON a.id = m.author_id
       WHERE m.status = 'active'
       ORDER BY m.pinned DESC, m.updated_at DESC
       LIMIT ?1`
    )
    .bind(limit)
    .all<MessageWithMeta>();
  return results ?? [];
}

export async function getMessage(
  db: D1Database,
  id: string
): Promise<MessageWithMeta | null> {
  return db
    .prepare(
      `SELECT m.id, m.subject, m.body_md, m.author_id, m.pinned, m.status,
              m.created_at, m.updated_at,
              a.name AS author_name,
              (SELECT COUNT(*) FROM comments c
                 WHERE c.parent_type = 'message' AND c.parent_id = m.id) AS comment_count
       FROM messages m
       JOIN members a ON a.id = m.author_id
       WHERE m.id = ?1`
    )
    .bind(id)
    .first<MessageWithMeta>();
}

export async function createMessage(
  db: D1Database,
  subject: string,
  bodyMd: string,
  authorId: string
): Promise<MessageRow> {
  const id = newId();
  const ts = nowSec();
  await db
    .prepare(
      `INSERT INTO messages (id, subject, body_md, author_id, pinned, status, created_at, updated_at)
       VALUES (?1, ?2, ?3, ?4, 0, 'active', ?5, ?5)`
    )
    .bind(id, subject.trim(), bodyMd, authorId, ts)
    .run();
  return {
    id,
    subject: subject.trim(),
    body_md: bodyMd,
    author_id: authorId,
    pinned: 0,
    status: "active",
    created_at: ts,
    updated_at: ts,
  };
}

export async function setMessagePinned(
  db: D1Database,
  id: string,
  pinned: boolean
): Promise<boolean> {
  const result = await db
    .prepare(
      `UPDATE messages SET pinned = ?2, updated_at = ?3 WHERE id = ?1 AND status = 'active'`
    )
    .bind(id, pinned ? 1 : 0, nowSec())
    .run();
  return (result.meta.changes ?? 0) === 1;
}

export async function listComments(
  db: D1Database,
  parentType: "message" | "task",
  parentId: string
): Promise<CommentWithAuthor[]> {
  const { results } = await db
    .prepare(
      `SELECT c.id, c.parent_type, c.parent_id, c.author_id, c.body_md,
              c.created_at, c.updated_at, m.name AS author_name
       FROM comments c
       JOIN members m ON m.id = c.author_id
       WHERE c.parent_type = ?1 AND c.parent_id = ?2
       ORDER BY c.created_at ASC`
    )
    .bind(parentType, parentId)
    .all<CommentWithAuthor>();
  return results ?? [];
}

export async function addComment(
  db: D1Database,
  parentType: "message" | "task",
  parentId: string,
  authorId: string,
  bodyMd: string
): Promise<CommentRow> {
  const id = newId();
  const ts = nowSec();
  await db
    .prepare(
      `INSERT INTO comments (id, parent_type, parent_id, author_id, body_md, created_at, updated_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?6)`
    )
    .bind(id, parentType, parentId, authorId, bodyMd, ts)
    .run();

  if (parentType === "message") {
    await db
      .prepare(`UPDATE messages SET updated_at = ?2 WHERE id = ?1`)
      .bind(parentId, ts)
      .run();
  } else {
    await db
      .prepare(`UPDATE tasks SET updated_at = ?2 WHERE id = ?1`)
      .bind(parentId, ts)
      .run();
  }

  return {
    id,
    parent_type: parentType,
    parent_id: parentId,
    author_id: authorId,
    body_md: bodyMd,
    created_at: ts,
    updated_at: ts,
  };
}

export async function listTaskLists(
  db: D1Database
): Promise<TaskListWithCounts[]> {
  const { results } = await db
    .prepare(
      `SELECT tl.id, tl.name, tl.description, tl.position, tl.created_at,
              SUM(CASE WHEN t.completed_at IS NULL THEN 1 ELSE 0 END) AS open_count,
              COUNT(t.id) AS total_count
       FROM task_lists tl
       LEFT JOIN tasks t ON t.list_id = tl.id
       GROUP BY tl.id
       ORDER BY tl.position ASC, tl.name COLLATE NOCASE`
    )
    .all<TaskListWithCounts>();
  return results ?? [];
}

export async function getTaskList(
  db: D1Database,
  id: string
): Promise<TaskListRow | null> {
  return db
    .prepare(
      `SELECT id, name, description, position, created_at FROM task_lists WHERE id = ?1`
    )
    .bind(id)
    .first<TaskListRow>();
}

export async function listTasksInList(
  db: D1Database,
  listId: string
): Promise<TaskWithMeta[]> {
  const { results } = await db
    .prepare(
      `SELECT t.id, t.list_id, t.title, t.description_md, t.assignee_id, t.due_date,
              t.completed_at, t.completed_by, t.position, t.created_at, t.updated_at,
              m.name AS assignee_name
       FROM tasks t
       LEFT JOIN members m ON m.id = t.assignee_id
       WHERE t.list_id = ?1
       ORDER BY CASE WHEN t.completed_at IS NULL THEN 0 ELSE 1 END,
                t.position ASC, t.created_at ASC`
    )
    .bind(listId)
    .all<TaskWithMeta>();
  return results ?? [];
}

export async function listMyOpenTasks(
  db: D1Database,
  assigneeId: string
): Promise<(TaskWithMeta & { list_name: string })[]> {
  const { results } = await db
    .prepare(
      `SELECT t.id, t.list_id, t.title, t.description_md, t.assignee_id, t.due_date,
              t.completed_at, t.completed_by, t.position, t.created_at, t.updated_at,
              m.name AS assignee_name, tl.name AS list_name
       FROM tasks t
       JOIN task_lists tl ON tl.id = t.list_id
       LEFT JOIN members m ON m.id = t.assignee_id
       WHERE t.assignee_id = ?1 AND t.completed_at IS NULL
       ORDER BY t.due_date IS NULL, t.due_date ASC, t.created_at ASC`
    )
    .bind(assigneeId)
    .all<TaskWithMeta & { list_name: string }>();
  return results ?? [];
}

export async function createTask(
  db: D1Database,
  listId: string,
  title: string,
  descriptionMd: string | null,
  assigneeId: string | null,
  dueDate: string | null
): Promise<TaskRow> {
  const id = newId();
  const ts = nowSec();
  const posRow = await db
    .prepare(
      `SELECT COALESCE(MAX(position), 0) + 1 AS next_pos FROM tasks WHERE list_id = ?1`
    )
    .bind(listId)
    .first<{ next_pos: number }>();
  const position = posRow?.next_pos ?? 1;

  await db
    .prepare(
      `INSERT INTO tasks (id, list_id, title, description_md, assignee_id, due_date,
                          completed_at, completed_by, position, created_at, updated_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, NULL, NULL, ?7, ?8, ?8)`
    )
    .bind(
      id,
      listId,
      title.trim(),
      descriptionMd,
      assigneeId,
      dueDate,
      position,
      ts
    )
    .run();

  return {
    id,
    list_id: listId,
    title: title.trim(),
    description_md: descriptionMd,
    assignee_id: assigneeId,
    due_date: dueDate,
    completed_at: null,
    completed_by: null,
    position,
    created_at: ts,
    updated_at: ts,
  };
}

export async function updateTask(
  db: D1Database,
  id: string,
  patch: {
    title?: string;
    descriptionMd?: string | null;
    assigneeId?: string | null;
    dueDate?: string | null;
    completed?: boolean;
    completedBy?: string | null;
  }
): Promise<boolean> {
  const existing = await db
    .prepare(`SELECT completed_at FROM tasks WHERE id = ?1`)
    .bind(id)
    .first<{ completed_at: number | null }>();
  if (!existing) return false;

  const ts = nowSec();
  let completedAt = existing.completed_at;
  let completedBy: string | null = null;

  if (patch.completed === true) {
    completedAt = ts;
    completedBy = patch.completedBy ?? null;
  } else if (patch.completed === false) {
    completedAt = null;
    completedBy = null;
  }

  const result = await db
    .prepare(
      `UPDATE tasks SET
         title = COALESCE(?2, title),
         description_md = CASE WHEN ?3 = 1 THEN ?4 ELSE description_md END,
         assignee_id = CASE WHEN ?5 = 1 THEN ?6 ELSE assignee_id END,
         due_date = CASE WHEN ?7 = 1 THEN ?8 ELSE due_date END,
         completed_at = ?9,
         completed_by = ?10,
         updated_at = ?11
       WHERE id = ?1`
    )
    .bind(
      id,
      patch.title?.trim() ?? null,
      patch.descriptionMd !== undefined ? 1 : 0,
      patch.descriptionMd ?? null,
      patch.assigneeId !== undefined ? 1 : 0,
      patch.assigneeId ?? null,
      patch.dueDate !== undefined ? 1 : 0,
      patch.dueDate ?? null,
      completedAt,
      completedBy,
      ts
    )
    .run();
  return (result.meta.changes ?? 0) === 1;
}

export async function getTask(
  db: D1Database,
  id: string
): Promise<TaskWithMeta | null> {
  return db
    .prepare(
      `SELECT t.id, t.list_id, t.title, t.description_md, t.assignee_id, t.due_date,
              t.completed_at, t.completed_by, t.position, t.created_at, t.updated_at,
              m.name AS assignee_name
       FROM tasks t
       LEFT JOIN members m ON m.id = t.assignee_id
       WHERE t.id = ?1`
    )
    .bind(id)
    .first<TaskWithMeta>();
}

export async function boardStats(db: D1Database): Promise<{
  openTasks: number;
  messages: number;
}> {
  const open = await db
    .prepare(`SELECT COUNT(*) AS n FROM tasks WHERE completed_at IS NULL`)
    .first<{ n: number }>();
  const msgs = await db
    .prepare(`SELECT COUNT(*) AS n FROM messages WHERE status = 'active'`)
    .first<{ n: number }>();
  return {
    openTasks: open?.n ?? 0,
    messages: msgs?.n ?? 0,
  };
}
