/*
  Warnings:

  - You are about to alter the column `rating` on the `Reviews` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(2,1)`.

*/
-- AlterTable
ALTER TABLE "Reviews" ALTER COLUMN "rating" SET DEFAULT 0.0,
ALTER COLUMN "rating" SET DATA TYPE DECIMAL(2,1);
