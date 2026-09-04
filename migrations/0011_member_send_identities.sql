-- Per-member From identities for board Respond (#40).
-- Reply-To stays locked to shared intake (board@) in application code.
CREATE TABLE member_send_identities (
  id           TEXT PRIMARY KEY,
  member_id    TEXT NOT NULL REFERENCES members(id),
  from_address TEXT NOT NULL,
  is_default   INTEGER NOT NULL DEFAULT 0,
  created_at   INTEGER NOT NULL,
  UNIQUE(member_id, from_address)
);
CREATE INDEX idx_send_identities_member ON member_send_identities(member_id);

-- Seed chapter role mailboxes (CF Email Sending must allow these Froms).
INSERT OR IGNORE INTO member_send_identities (id, member_id, from_address, is_default, created_at)
SELECT 'sid_hyman_pres', id, 'president@gatorredleg.org', 1, strftime('%s','now')
  FROM members WHERE email = 'ahyman2@yahoo.com';
INSERT OR IGNORE INTO member_send_identities (id, member_id, from_address, is_default, created_at)
SELECT 'sid_wagner_board', id, 'board@gatorredleg.org', 1, strftime('%s','now')
  FROM members WHERE email = 'matt@redleg.dev';
INSERT OR IGNORE INTO member_send_identities (id, member_id, from_address, is_default, created_at)
SELECT 'sid_mckean_sec', id, 'secretary@gatorredleg.org', 1, strftime('%s','now')
  FROM members WHERE email = 'ashleighmotte@gmail.com';
INSERT OR IGNORE INTO member_send_identities (id, member_id, from_address, is_default, created_at)
SELECT 'sid_veguilla_treas', id, 'treasurer@gatorredleg.org', 1, strftime('%s','now')
  FROM members WHERE email = 'julio.veguilla@gmail.com';
