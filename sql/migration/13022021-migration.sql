CREATE TABLE IF NOT EXISTS app_config (
    id VARCHAR(50) PRIMARY KEY,
    pricing VARCHAR(500),
    warning_delay SMALLINT,
    defaulter_delay SMALLINT,
    email_content VARCHAR,
    user_id VARCHAR REFERENCES users(id) ON DELETE CASCADE
);

ALTER TABLE users ADD COLUMN owner_id VARCHAR(50);

UPDATE users SET owner_id='51e2e904-4b35-47f0-ac77-f54776a3a6db';