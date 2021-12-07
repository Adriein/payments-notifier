CREATE TABLE IF NOT EXISTS nutrition (
    id VARCHAR(50) PRIMARY KEY,
    weight SMALLINT,
    height SMALLINT,
    age SMALLINT,
    gender VARCHAR(50),
    user_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS diet (
    id VARCHAR(50) PRIMARY KEY,
    diet_name VARCHAR(100),
    objective VARCHAR(50),
    kcal SMALLINT,
    nutrition_id VARCHAR REFERENCES nutrition(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS meal (
    id VARCHAR(50) PRIMARY KEY,
    meal_name VARCHAR(100),
    diet_id VARCHAR REFERENCES diet(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS food (
    id VARCHAR(50) PRIMARY KEY,
    food_name VARCHAR,
    serving_unit VARCHAR,
    qty SMALLINT,
    photo VARCHAR,
    kcal SMALLINT,
    carbohydrates SMALLINT,
    total_fat SMALLINT,
    satured_fat SMALLINT,
    cholesterol SMALLINT,
    sodium SMALLINT,
    protein SMALLINT,
    sugars SMALLINT,
    potasium SMALLINT,
    fiber SMALLINT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS nutritionix_api_metadata (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
    api_calls SMALLINT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);



model nutritionix_api_metadata {
    id String @id
    user user @relation(fields: [user_id], references: [id])
    user_id  String
    api_calls Int
    created_at DateTime @db.Timestamp(0)
    updated_at DateTime @db.Timestamp(0)
}