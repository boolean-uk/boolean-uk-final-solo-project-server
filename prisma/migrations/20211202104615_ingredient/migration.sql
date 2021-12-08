/*
  Warnings:

  - A unique constraint covering the columns `[ingredientId]` on the table `Price` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ingredientId` to the `Price` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Price" ADD COLUMN     "ingredientId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Price_ingredientId_key" ON "Price"("ingredientId");

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
