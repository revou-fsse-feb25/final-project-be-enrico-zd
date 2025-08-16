/*
  Warnings:

  - A unique constraint covering the columns `[company_name]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Company" ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "payroll_date" SET DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "Company_company_name_key" ON "public"."Company"("company_name");
