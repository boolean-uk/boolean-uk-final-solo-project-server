-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "totalTime" INTEGER NOT NULL,
    "serving" INTEGER NOT NULL,
    "dishType" VARCHAR(255) NOT NULL,
    "instruction" TEXT NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);
