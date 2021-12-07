/*
  Warnings:

  - You are about to drop the column `assetName` on the `Trade` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "assetName",
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;
