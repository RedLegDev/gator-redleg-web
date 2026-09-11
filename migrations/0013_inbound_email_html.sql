-- Keep the HTML part of inbound mail so the thread can sandbox-render it.
ALTER TABLE inbound_emails ADD COLUMN body_html TEXT;
