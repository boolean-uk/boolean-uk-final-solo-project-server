/*
  Warnings:

  - You are about to drop the column `nutritionInfo` on the `Ingredient` table. All the data in the column will be lost.
  - Added the required column `calories` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carbs` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fat` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protein` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "nutritionInfo";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "calories" INTEGER NOT NULL,
ADD COLUMN     "carbs" INTEGER NOT NULL,
ADD COLUMN     "fat" INTEGER NOT NULL,
ADD COLUMN     "protein" INTEGER NOT NULL;
