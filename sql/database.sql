CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subscriptions (
    id VARCHAR(50) PRIMARY KEY,
    pricing VARCHAR(50),
    payment_date VARCHAR(100),
    warned BOOLEAN,
    notified BOOLEAN,
    user_id VARCHAR REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS config (
    id VARCHAR(50) PRIMARY KEY,
    language VARCHAR(5),
    role VARCHAR(50),
    send_notifications BOOLEAN,
    send_warnings BOOLEAN,
    user_id VARCHAR REFERENCES users(id) ON DELETE CASCADE
);