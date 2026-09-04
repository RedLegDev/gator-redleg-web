-- Member access control lives in D1 (status + role), not wrangler secrets.

ALTER TABLE members ADD COLUMN status TEXT NOT NULL DEFAULT 'active';
CREATE INDEX idx_members_status ON members(status);
