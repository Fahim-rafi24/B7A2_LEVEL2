-- =========================================
-- ISSUES TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS issues (
    id SERIAL PRIMARY KEY,

    title VARCHAR(150) NOT NULL,

    description TEXT NOT NULL
        CHECK (char_length(description) >= 20),

    type VARCHAR(30) NOT NULL
        CHECK (type IN ('bug', 'feature_request')),

    status VARCHAR(30) DEFAULT 'open'
        CHECK (status IN ('open', 'in_progress', 'resolved')),

    reporter_id INTEGER NOT NULL,

    created_at TIMESTAMP DEFAULT NOW(),

    updated_at TIMESTAMP DEFAULT NOW()
);

-- =========================================
-- ISSUES UPDATED_AT TRIGGER
-- =========================================

DROP TRIGGER IF EXISTS trg_issues_updated_at ON issues;

CREATE TRIGGER trg_issues_updated_at
BEFORE UPDATE ON issues
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

