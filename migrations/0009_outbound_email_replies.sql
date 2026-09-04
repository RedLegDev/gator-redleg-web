-- Outbound replies sent from the board hub (Comment vs Respond).
-- Linked to the inbound email + the thread comment that records the send.
CREATE TABLE outbound_email_replies (
  id               TEXT PRIMARY KEY,
  inbound_email_id TEXT NOT NULL REFERENCES inbound_emails(id),
  message_id       TEXT NOT NULL REFERENCES messages(id),
  comment_id       TEXT NOT NULL UNIQUE REFERENCES comments(id),
  to_address       TEXT NOT NULL,
  from_address     TEXT NOT NULL,
  subject          TEXT NOT NULL,
  body_text        TEXT NOT NULL,
  sent_by          TEXT NOT NULL REFERENCES members(id),
  sent_at          INTEGER NOT NULL
);
CREATE INDEX idx_outbound_replies_message ON outbound_email_replies(message_id, sent_at);
CREATE INDEX idx_inbound_emails_message ON inbound_emails(board_message_id);
