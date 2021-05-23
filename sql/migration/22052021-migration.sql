CREATE TABLE IF NOT EXISTS diet (
    id VARCHAR(50) PRIMARY KEY,
    maxKcal SMALLINT,
    user_id VARCHAR REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS diet_customitzation (
    id VARCHAR(50) PRIMARY KEY,
    weekly_organized BOOLEAN,
    meal_organized BOOLEAN,
    diet_id VARCHAR REFERENCES diet(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS diet_meal (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR,
    diet_id VARCHAR REFERENCES diet(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS food (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR,
    quantity SMALLINT,
    ch SMALLINT,
    fat SMALLINT,
    protein SMALLINT,
    fiber SMALLINT,
    kcal SMALLINT
);

CREATE TABLE IF NOT EXISTS meal_food (
    id VARCHAR(50) PRIMARY KEY,
    food_id VARCHAR REFERENCES food(id) ON DELETE CASCADE,
    meal_id VARCHAR REFERENCES diet_meal(id) ON DELETE CASCADE
);