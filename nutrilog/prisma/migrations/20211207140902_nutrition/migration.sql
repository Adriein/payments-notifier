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

-- AddForeignKey
ALTER TABLE "nutrition" ADD CONSTRAINT "nutrition_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition" ADD CONSTRAINT "nutrition_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
