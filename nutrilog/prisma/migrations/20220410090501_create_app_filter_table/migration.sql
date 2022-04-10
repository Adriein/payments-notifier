-- CreateTable
CREATE TABLE "app_filter" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "app_filter_pkey" PRIMARY KEY ("id")
);
