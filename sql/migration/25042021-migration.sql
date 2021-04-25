CREATE TABLE IF NOT EXISTS nutrition (
    id VARCHAR(50) PRIMARY KEY,
    weight SMALLINT,
    height SMALLINT,
    age SMALLINT,
    activity VARCHAR,
    objective VARCHAR,
    gender VARCHAR,
    user_id VARCHAR REFERENCES users(id) ON DELETE CASCADE
);