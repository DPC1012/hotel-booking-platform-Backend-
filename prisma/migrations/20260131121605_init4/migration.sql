/*
  Warnings:

  - You are about to alter the column `rating` on the `Reviews` table. The data in that column could be lost. The data in that column will be cast from `Decimal(2,1)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Reviews" ALTER COLUMN "rating" DROP DEFAULT,
ALTER COLUMN "rating" SET DATA TYPE INTEGER;
