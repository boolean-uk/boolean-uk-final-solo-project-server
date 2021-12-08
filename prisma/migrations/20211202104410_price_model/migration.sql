-- CreateTable
CREATE TABLE "Price" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "unitOfMeasure" VARCHAR(255) NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);
