-- Per-recipient Reply-To addresses (reply-<token>@gatorredleg.org) so email
-- replies land as comments on the board item they answer.
-- recipient is a member id (recipient_kind = 'member') or a lowercase outside
-- address (recipient_kind = 'external', the correspondent on an email thread).
CREATE TABLE email_reply_addresses (
  token          TEXT PRIMARY KEY,
  parent_type    TEXT NOT NULL CHECK (parent_type IN ('message', 'task')),
  parent_id      TEXT NOT NULL,
  recipient_kind TEXT NOT NULL CHECK (recipient_kind IN ('member', 'external')),
  recipient      TEXT NOT NULL,
  created_at     INTEGER NOT NULL,
  UNIQUE (parent_type, parent_id, recipient_kind, recipient)
);

-- Outside replies that were threaded onto an existing email thread as a comment.
ALTER TABLE inbound_emails ADD COLUMN comment_id TEXT REFERENCES comments(id);
CREATE INDEX idx_inbound_emails_comment ON inbound_emails(comment_id);
