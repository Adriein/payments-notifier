CREATE TABLE IF NOT EXISTS app_config (
    id VARCHAR(50) PRIMARY KEY,
    pricing VARCHAR(500),
    warning_delay SMALLINT,
    defaulter_delay SMALLINT,
    email_content VARCHAR,
    user_id VARCHAR REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO app_config (id, pricing, warning_delay, defaulter_delay, email_content, user_id) VALUES ('6b9902f6-4d22-4441-a1f1-c987d6fa9000', '{"mensual":{"duration":30,"price":50},"trimestral":{"duration":90,"price":150}}', 5, 2, '', 'ba8740ef-c7eb-44cc-a114-77b17404ea34');

ALTER TABLE users ADD COLUMN owner_id VARCHAR(50);

UPDATE users SET owner_id='ba8740ef-c7eb-44cc-a114-77b17404ea34';

UPDATE subscriptions SET pricing='{"mensual":{"duration":30,"price":50}}' WHERE pricing='mensual';
UPDATE subscriptions SET pricing='{"trimestral":{"duration":90,"price":150}}' WHERE pricing='trimestral';


ALTER TABLE subscriptions ADD COLUMN active BOOLEAN;

INSERT INTO subscriptions (id, pricing, payment_date, warned, notified, user_id) VALUES ('55bfc474-8c4b-474a-8ff3-b23433a40a64', '{"anual":{"duration":365,"price":1000}}', 'Sat Feb 27 2021 15:51:21 GMT+0100 (hora estándar de Europa central)', false, false, 'ba8740ef-c7eb-44cc-a114-77b17404ea34', true);

UPDATE subscriptions SET active=true;