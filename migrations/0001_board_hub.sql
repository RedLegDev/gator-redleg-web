-- Board hub: members, auth, messages, tasks, comments, activity.
-- Times are unix seconds (UTC).

CREATE TABLE members (
  id           TEXT PRIMARY KEY,
  email        TEXT NOT NULL UNIQUE,
  name         TEXT NOT NULL,
  role         TEXT NOT NULL DEFAULT 'member',
  created_at   INTEGER NOT NULL,
  last_seen_at INTEGER
);

CREATE TABLE login_tokens (
  token_hash TEXT PRIMARY KEY,
  email      TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  used_at    INTEGER,
  created_at INTEGER NOT NULL
);
CREATE INDEX idx_login_tokens_expires ON login_tokens(expires_at);

CREATE TABLE messages (
  id         TEXT PRIMARY KEY,
  subject    TEXT NOT NULL,
  body_md    TEXT NOT NULL,
  author_id  TEXT NOT NULL REFERENCES members(id),
  pinned     INTEGER NOT NULL DEFAULT 0,
  status     TEXT NOT NULL DEFAULT 'active',
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE INDEX idx_messages_updated ON messages(updated_at DESC);
CREATE INDEX idx_messages_pinned ON messages(pinned DESC, updated_at DESC);

CREATE TABLE task_lists (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT,
  position    INTEGER NOT NULL DEFAULT 0,
  created_at  INTEGER NOT NULL
);

CREATE TABLE tasks (
  id             TEXT PRIMARY KEY,
  list_id        TEXT NOT NULL REFERENCES task_lists(id),
  title          TEXT NOT NULL,
  description_md TEXT,
  assignee_id    TEXT REFERENCES members(id),
  due_date       TEXT,
  completed_at   INTEGER,
  completed_by   TEXT REFERENCES members(id),
  position       INTEGER NOT NULL DEFAULT 0,
  created_at     INTEGER NOT NULL,
  updated_at     INTEGER NOT NULL
);
CREATE INDEX idx_tasks_list ON tasks(list_id, completed_at, position);
CREATE INDEX idx_tasks_assignee ON tasks(assignee_id, completed_at);

CREATE TABLE comments (
  id          TEXT PRIMARY KEY,
  parent_type TEXT NOT NULL,
  parent_id   TEXT NOT NULL,
  author_id   TEXT NOT NULL REFERENCES members(id),
  body_md     TEXT NOT NULL,
  created_at  INTEGER NOT NULL,
  updated_at  INTEGER NOT NULL
);
CREATE INDEX idx_comments_parent ON comments(parent_type, parent_id, created_at);

CREATE TABLE activity (
  id          TEXT PRIMARY KEY,
  actor_id    TEXT NOT NULL REFERENCES members(id),
  verb        TEXT NOT NULL,
  object_type TEXT NOT NULL,
  object_id   TEXT NOT NULL,
  summary     TEXT NOT NULL,
  created_at  INTEGER NOT NULL
);
CREATE INDEX idx_activity_created ON activity(created_at DESC);

CREATE TABLE notification_prefs (
  member_id         TEXT PRIMARY KEY REFERENCES members(id),
  email_on_mention  INTEGER NOT NULL DEFAULT 1,
  email_on_assigned INTEGER NOT NULL DEFAULT 1,
  digest_daily      INTEGER NOT NULL DEFAULT 0
);
