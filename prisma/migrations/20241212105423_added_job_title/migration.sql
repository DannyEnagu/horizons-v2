/*
  Warnings:

  - Added the required column `jobTitle` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "jobTitle" TEXT NOT NULL;