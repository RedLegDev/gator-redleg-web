-- Failed OTP verify attempts (brute-force throttle).
CREATE TABLE login_otp_attempts (
  id           TEXT PRIMARY KEY,
  email        TEXT NOT NULL,
  attempted_at INTEGER NOT NULL
);
CREATE INDEX idx_login_otp_attempts_email ON login_otp_attempts(email, attempted_at DESC);
