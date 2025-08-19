/*
  Warnings:

  - A unique constraint covering the columns `[company_id,user_id,attendance_date]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `company_id` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Attendance" ADD COLUMN     "company_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Attendance_company_id_attendance_date_idx" ON "public"."Attendance"("company_id", "attendance_date");

-- CreateIndex
CREATE INDEX "Attendance_company_id_user_id_idx" ON "public"."Attendance"("company_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_company_id_user_id_attendance_date_key" ON "public"."Attendance"("company_id", "user_id", "attendance_date");

-- AddForeignKey
ALTER TABLE "public"."Attendance" ADD CONSTRAINT "Attendance_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."Company"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;
