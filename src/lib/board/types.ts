export type MemberRole = "president" | "officer" | "member";

export type Member = {
  id: string;
  email: string;
  name: string;
  role: MemberRole;
};

export type MessageRow = {
  id: string;
  subject: string;
  body_md: string;
  author_id: string;
  pinned: number;
  status: string;
  created_at: number;
  updated_at: number;
};

export type TaskListRow = {
  id: string;
  name: string;
  description: string | null;
  position: number;
  created_at: number;
};

export type TaskRow = {
  id: string;
  list_id: string;
  title: string;
  description_md: string | null;
  assignee_id: string | null;
  due_date: string | null;
  completed_at: number | null;
  completed_by: string | null;
  position: number;
  created_at: number;
  updated_at: number;
};

export type CommentRow = {
  id: string;
  parent_type: "message" | "task";
  parent_id: string;
  author_id: string;
  body_md: string;
  created_at: number;
  updated_at: number;
};

export type MessageWithMeta = MessageRow & {
  author_name: string;
  comment_count: number;
};

export type TaskWithMeta = TaskRow & {
  assignee_name: string | null;
};

export type TaskListWithCounts = TaskListRow & {
  open_count: number;
  total_count: number;
};

export type CommentWithAuthor = CommentRow & {
  author_name: string;
};

export type AttachmentRow = {
  id: string;
  parent_type: "message" | "comment" | null;
  parent_id: string | null;
  uploader_id: string;
  filename: string;
  content_type: string;
  size_bytes: number;
  r2_key: string;
  created_at: number;
};

export type AttachmentMeta = Pick<
  AttachmentRow,
  "id" | "filename" | "content_type" | "size_bytes"
>;
