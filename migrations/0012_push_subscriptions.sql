-- Web Push subscriptions for board hub (#38).
CREATE TABLE push_subscriptions (
  id          TEXT PRIMARY KEY,
  member_id   TEXT NOT NULL REFERENCES members(id),
  endpoint    TEXT NOT NULL UNIQUE,
  p256dh      TEXT NOT NULL,
  auth        TEXT NOT NULL,
  user_agent  TEXT,
  created_at  INTEGER NOT NULL,
  updated_at  INTEGER NOT NULL
);
CREATE INDEX idx_push_subscriptions_member ON push_subscriptions(member_id);
