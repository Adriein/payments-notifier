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