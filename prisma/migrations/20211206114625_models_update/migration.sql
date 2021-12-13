/*
  Warnings:

  - You are about to drop the column `assetId` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `TradesOnUsers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `assetSymbol` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Trade` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TradeType" AS ENUM ('BUY', 'SELL');

-- DropForeignKey
ALTER TABLE "TradesOnUsers" DROP CONSTRAINT "TradesOnUsers_tradeId_fkey";

-- DropForeignKey
ALTER TABLE "TradesOnUsers" DROP CONSTRAINT "TradesOnUsers_userId_fkey";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "assetId",
DROP COLUMN "status",
ADD COLUMN     "assetSymbol" VARCHAR(10) NOT NULL,
ADD COLUMN     "type" "TradeType" NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "validated" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "TradesOnUsers";

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "mainAddress" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "postcode" VARCHAR(8) NOT NULL,
    "newsLetter" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
