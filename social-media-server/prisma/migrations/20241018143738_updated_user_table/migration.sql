/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "token" VARCHAR(255),
ADD COLUMN     "token_validity" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "user_token_key" ON "user"("token");
