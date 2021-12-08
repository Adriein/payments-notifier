-- CreateTable
CREATE TABLE "diet" (
    "id" TEXT NOT NULL,
    "diet_name" TEXT NOT NULL,
    "objective" TEXT NOT NULL,
    "kcal" SMALLINT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "nutrition_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "diet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meal" (
    "id" TEXT NOT NULL,
    "meal_name" TEXT NOT NULL,
    "diet_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food" (
    "id" TEXT NOT NULL,
    "food_name" TEXT NOT NULL,
    "serving_unit" SMALLINT NOT NULL,
    "qty" SMALLINT NOT NULL,
    "photo" TEXT NOT NULL,
    "kcal" SMALLINT NOT NULL,
    "carbohydrates" SMALLINT NOT NULL,
    "total_fat" SMALLINT NOT NULL,
    "satured_fat" SMALLINT NOT NULL,
    "cholesterol" SMALLINT NOT NULL,
    "sodium" SMALLINT NOT NULL,
    "protein" SMALLINT NOT NULL,
    "sugars" SMALLINT NOT NULL,
    "potasium" SMALLINT NOT NULL,
    "fiber" SMALLINT NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meal_food" (
    "id" TEXT NOT NULL,
    "meal_id" TEXT NOT NULL,
    "food_id" TEXT NOT NULL,

    CONSTRAINT "meal_food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutritionix_api_metadata" (
    "id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "api_calls" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "nutritionix_api_metadata_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "diet" ADD CONSTRAINT "diet_nutrition_id_fkey" FOREIGN KEY ("nutrition_id") REFERENCES "nutrition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal" ADD CONSTRAINT "meal_diet_id_fkey" FOREIGN KEY ("diet_id") REFERENCES "diet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_food" ADD CONSTRAINT "meal_food_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_food" ADD CONSTRAINT "meal_food_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
