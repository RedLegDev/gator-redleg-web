-- Dev / initial board roster. Emails are placeholders — update before production
-- or rely on first-login upsert from BOARD_ALLOWLIST.

INSERT INTO task_lists (id, name, description, position, created_at) VALUES
  ('list_stbarb_2026', 'St. Barbara''s 2026', 'Annual dining-out planning', 1, strftime('%s','now')),
  ('list_inbox', 'Inbox / Housekeeping', 'Chapter admin and recurring tasks', 2, strftime('%s','now')),
  ('list_exec', 'Executive Board and Members-at-Large', NULL, 3, strftime('%s','now')),
  ('list_treasurer', 'Treasurer', NULL, 4, strftime('%s','now')),
  ('list_website', 'GatorRedleg.org', NULL, 5, strftime('%s','now'));
