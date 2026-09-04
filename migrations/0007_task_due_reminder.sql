-- Track due-date reminder emails (BH-15 cron).

ALTER TABLE tasks ADD COLUMN due_reminder_sent_at INTEGER;
