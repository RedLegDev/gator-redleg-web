-- Archive of inbound chapter mail processed by the Worker email() handler.
CREATE TABLE inbound_emails (
  id           TEXT PRIMARY KEY,
  from_address TEXT NOT NULL,
  to_address   TEXT NOT NULL,
  subject      TEXT,
  body_text    TEXT,
  board_message_id TEXT REFERENCES messages(id),
  received_at  INTEGER NOT NULL
);
CREATE INDEX idx_inbound_emails_received ON inbound_emails(received_at DESC);
