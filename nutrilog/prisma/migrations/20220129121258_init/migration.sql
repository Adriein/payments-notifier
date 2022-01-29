-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing" (
    "id" TEXT NOT NULL,
    "pricing_name" TEXT NOT NULL,
    "duration" SMALLINT NOT NULL,
    "amount" SMALLINT NOT NULL,
    "user_id" TEXT,
    "created_at" TIMESTAMP(0) NOT NULL,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "pricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription" (
    "id" TEXT NOT NULL,
    "payment_date" TIMESTAMP(0) NOT NULL,
    "valid_to" TIMESTAMP(0) NOT NULL,
    "warned" BOOLEAN NOT NULL,
    "notified" BOOLEAN NOT NULL,
    "active" BOOLEAN NOT NULL,
    "expired" BOOLEAN NOT NULL,
    "pricing_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "config" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "send_notifications" BOOLEAN NOT NULL,
    "send_warnings" BOOLEAN NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_config" (
    "id" TEXT NOT NULL,
    "warning_delay" SMALLINT NOT NULL,
    "notification_delay" SMALLINT NOT NULL,
    "email_content" TEXT NOT NULL,
    "last_sent_report" TIMESTAMP(0) NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "app_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutrition" (
    "id" TEXT NOT NULL,
    "weight" SMALLINT NOT NULL,
    "height" SMALLINT NOT NULL,
    "age" SMALLINT NOT NULL,
    "gender" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "nutrition_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "config_user_id_key" ON "config"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "app_config_user_id_key" ON "app_config"("user_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_pricing_id_fkey" FOREIGN KEY ("pricing_id") REFERENCES "pricing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "config" ADD CONSTRAINT "config_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_config" ADD CONSTRAINT "app_config_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition" ADD CONSTRAINT "nutrition_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition" ADD CONSTRAINT "nutrition_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diet" ADD CONSTRAINT "diet_nutrition_id_fkey" FOREIGN KEY ("nutrition_id") REFERENCES "nutrition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal" ADD CONSTRAINT "meal_diet_id_fkey" FOREIGN KEY ("diet_id") REFERENCES "diet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_food" ADD CONSTRAINT "meal_food_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_food" ADD CONSTRAINT "meal_food_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
