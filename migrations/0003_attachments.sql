-- Message and comment file attachments (R2-backed).

CREATE TABLE attachments (
  id           TEXT PRIMARY KEY,
  parent_type  TEXT,
  parent_id    TEXT,
  uploader_id  TEXT NOT NULL REFERENCES members(id),
  filename     TEXT NOT NULL,
  content_type TEXT NOT NULL,
  size_bytes   INTEGER NOT NULL,
  r2_key       TEXT NOT NULL UNIQUE,
  created_at   INTEGER NOT NULL
);
CREATE INDEX idx_attachments_parent ON attachments(parent_type, parent_id);
