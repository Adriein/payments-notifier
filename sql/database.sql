CREATE TABLE IF NOT EXISTS users (
    us_id VARCHAR(50) PRIMARY KEY,
    us_username VARCHAR(50),
    us_email VARCHAR(100),
    us_password VARCHAR(500),
    us_owner_id VARCHAR(50),
    us_created_at TIMESTAMP(0),
    us_updated_at TIMESTAMP(0)
);

CREATE TABLE IF NOT EXISTS pricing (
    pr_id VARCHAR(50) PRIMARY KEY,
    pr_pricing_name VARCHAR(100),
    pr_duration SMALLINT,
    pr_amount SMALLINT,
    pr_user_id VARCHAR REFERENCES users(us_id) ON DELETE CASCADE,
    pr_created_at TIMESTAMP(0),
    pr_updated_at TIMESTAMP(0)
);

CREATE TABLE IF NOT EXISTS subscriptions (
    su_id VARCHAR(50) PRIMARY KEY,
    su_pricing_id VARCHAR REFERENCES pricing(pr_id) ON DELETE CASCADE,
    su_payment_date TIMESTAMP(0),
    su_warned BOOLEAN,
    su_notified BOOLEAN,
    su_user_id VARCHAR REFERENCES users(us_id) ON DELETE CASCADE,
    su_active BOOLEAN,
    su_created_at TIMESTAMP(0),
    su_updated_at TIMESTAMP(0)
);

CREATE TABLE IF NOT EXISTS subscriptions_pricing (
    supr_id VARCHAR(50) PRIMARY KEY,
    supr_pricing_id VARCHAR REFERENCES pricing(pr_id) ON DELETE CASCADE,
    supr_subscription_id VARCHAR REFERENCES subscriptions(su_id) ON DELETE CASCADE,
    supr_created_at TIMESTAMP(0),
    supr_updated_at TIMESTAMP(0)
);

CREATE TABLE IF NOT EXISTS config (
    co_id VARCHAR(50) PRIMARY KEY,
    co_language VARCHAR(5),
    co_role VARCHAR(50),
    co_send_notifications BOOLEAN,
    co_send_warnings BOOLEAN,
    co_user_id VARCHAR REFERENCES users(us_id) ON DELETE CASCADE,
    co_created_at TIMESTAMP(0),
    co_updated_at TIMESTAMP(0)
);

CREATE TABLE IF NOT EXISTS app_config (
    apco_id VARCHAR(50) PRIMARY KEY,
    apco_pricing VARCHAR(500),
    apco_warning_delay SMALLINT,
    apco_defaulter_delay SMALLINT,
    apco_email_content VARCHAR,
    apco_user_id VARCHAR REFERENCES users(us_id) ON DELETE CASCADE,
    apco_last_sent_report TIMESTAMP(0),
    apco_created_at TIMESTAMP(0),
    apco_updated_at TIMESTAMP(0)
);

INSERT INTO pricing VALUES ('2c65eb3a-9014-4d5b-ba48-2218381d754b', 'yearly', '365', 1000, null, now(), now());
INSERT INTO pricing VALUES ('8446adf3-5a7b-4ebd-8063-deb5449c1405', 'quarterly', '90', 150, now(), now());
INSERT INTO pricing VALUES ('3fd13745-5a42-4b40-9b9c-4de8df96e0e1', 'monthly', '30', 50, now(), now());