-- =========================================
-- INDEXES
-- =========================================

CREATE INDEX IF NOT EXISTS idx_users_email
ON users(email);

CREATE INDEX IF NOT EXISTS idx_issues_reporter_id
ON issues(reporter_id);

CREATE INDEX IF NOT EXISTS idx_issues_status
ON issues(status);

CREATE INDEX IF NOT EXISTS idx_issues_type
ON issues(type);

CREATE INDEX IF NOT EXISTS idx_issues_created_at
ON issues(created_at DESC);