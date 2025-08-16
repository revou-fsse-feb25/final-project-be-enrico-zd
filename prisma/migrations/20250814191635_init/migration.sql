-- CreateEnum
CREATE TYPE "public"."StatusActive" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "public"."Holiday" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'STAFF', 'INTERNSHIP');

-- CreateEnum
CREATE TYPE "public"."EmployeeType" AS ENUM ('CONTRACT', 'PERMANENT', 'TEMPORARY');

-- CreateEnum
CREATE TYPE "public"."UserType" AS ENUM ('FIELD', 'NONFIELD');

-- CreateEnum
CREATE TYPE "public"."WorkSpace" AS ENUM ('HOME', 'OFFICE');

-- CreateEnum
CREATE TYPE "public"."PaidLeave" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "public"."LeaveStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."AttendanceStatus" AS ENUM ('PRESENT', 'LATE', 'ABSENT', 'LEAVE');

-- CreateEnum
CREATE TYPE "public"."AttendanceBy" AS ENUM ('ADMIN', 'SELF');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "public"."Company" (
    "company_id" SERIAL NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_owner" TEXT NOT NULL,
    "company_address" TEXT NOT NULL,
    "company_email" TEXT NOT NULL,
    "company_phone" TEXT NOT NULL,
    "web_url" VARCHAR(255),
    "npwp" VARCHAR(50),
    "payroll_date" INTEGER NOT NULL,
    "status" "public"."StatusActive" NOT NULL DEFAULT 'ACTIVE',
    "image_company" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "public"."Shift" (
    "shift_id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "opening_time" TIME(0) NOT NULL,
    "closing_time" TIME(0) NOT NULL,
    "status" "public"."StatusActive" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("shift_id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "user_id" SERIAL NOT NULL,
    "nik" TEXT,
    "family_card_number" TEXT,
    "employment_number" TEXT,
    "passport_number" TEXT,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "email" TEXT NOT NULL,
    "phone_number" TEXT,
    "date_of_birth" DATE,
    "avatar" TEXT,
    "gender" "public"."Gender" NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refresh_token" TEXT,
    "role" "public"."Role" NOT NULL DEFAULT 'STAFF',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."UserCompanyDetail" (
    "user_company_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,
    "employee_type" "public"."EmployeeType" NOT NULL,
    "user_type" "public"."UserType" NOT NULL,
    "joining_date" DATE NOT NULL,
    "leaving_date" DATE,
    "shift_id" INTEGER,
    "workspace" "public"."WorkSpace" NOT NULL,
    "user_status" "public"."StatusActive" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCompanyDetail_pkey" PRIMARY KEY ("user_company_id")
);

-- CreateTable
CREATE TABLE "public"."Attendance" (
    "attendance_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "attendance_date" DATE NOT NULL,
    "check_in_at" TIME(0),
    "check_out_at" TIME(0),
    "shift_id" INTEGER,
    "attendance_status" "public"."AttendanceStatus" NOT NULL DEFAULT 'PRESENT',
    "attendance_by" "public"."AttendanceBy" NOT NULL DEFAULT 'SELF',
    "hours_work_min" INTEGER NOT NULL DEFAULT 0,
    "late_minute" INTEGER NOT NULL DEFAULT 0,
    "overtime_min" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("attendance_id")
);

-- CreateTable
CREATE TABLE "public"."LeaveType" (
    "leave_type_id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "leave_type_name" TEXT NOT NULL,
    "paid_leave" "public"."PaidLeave" NOT NULL,
    "leave_allocated_day" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeaveType_pkey" PRIMARY KEY ("leave_type_id")
);

-- CreateTable
CREATE TABLE "public"."LeaveRequest" (
    "leave_request_id" SERIAL NOT NULL,
    "leave_type_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "reason" TEXT,
    "proof_image" TEXT,
    "from" TIMESTAMP(0) NOT NULL,
    "to" TIMESTAMP(0) NOT NULL,
    "request_date" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requested_days" INTEGER NOT NULL,
    "status" "public"."LeaveStatus" NOT NULL DEFAULT 'PENDING',
    "approved_by" INTEGER,
    "approved_at" TIMESTAMP(0),
    "admin_remark" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeaveRequest_pkey" PRIMARY KEY ("leave_request_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_company_email_key" ON "public"."Company"("company_email");

-- CreateIndex
CREATE INDEX "Company_status_idx" ON "public"."Company"("status");

-- CreateIndex
CREATE INDEX "Shift_company_id_idx" ON "public"."Shift"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "Shift_company_id_title_key" ON "public"."Shift"("company_id", "title");

-- CreateIndex
CREATE UNIQUE INDEX "User_nik_key" ON "public"."User"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "User_family_card_number_key" ON "public"."User"("family_card_number");

-- CreateIndex
CREATE UNIQUE INDEX "User_employment_number_key" ON "public"."User"("employment_number");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "public"."User"("role");

-- CreateIndex
CREATE INDEX "UserCompanyDetail_user_id_company_id_idx" ON "public"."UserCompanyDetail"("user_id", "company_id");

-- CreateIndex
CREATE INDEX "UserCompanyDetail_company_id_shift_id_idx" ON "public"."UserCompanyDetail"("company_id", "shift_id");

-- CreateIndex
CREATE INDEX "Attendance_user_id_attendance_date_idx" ON "public"."Attendance"("user_id", "attendance_date");

-- CreateIndex
CREATE INDEX "LeaveType_company_id_idx" ON "public"."LeaveType"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "LeaveType_company_id_leave_type_name_key" ON "public"."LeaveType"("company_id", "leave_type_name");

-- CreateIndex
CREATE INDEX "LeaveRequest_user_id_request_date_idx" ON "public"."LeaveRequest"("user_id", "request_date");

-- CreateIndex
CREATE INDEX "LeaveRequest_leave_type_id_idx" ON "public"."LeaveRequest"("leave_type_id");

-- CreateIndex
CREATE INDEX "LeaveRequest_status_idx" ON "public"."LeaveRequest"("status");

-- AddForeignKey
ALTER TABLE "public"."Shift" ADD CONSTRAINT "Shift_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."Company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserCompanyDetail" ADD CONSTRAINT "UserCompanyDetail_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserCompanyDetail" ADD CONSTRAINT "UserCompanyDetail_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."Company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserCompanyDetail" ADD CONSTRAINT "UserCompanyDetail_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "public"."Shift"("shift_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attendance" ADD CONSTRAINT "Attendance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attendance" ADD CONSTRAINT "Attendance_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "public"."Shift"("shift_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LeaveType" ADD CONSTRAINT "LeaveType_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."Company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LeaveRequest" ADD CONSTRAINT "LeaveRequest_leave_type_id_fkey" FOREIGN KEY ("leave_type_id") REFERENCES "public"."LeaveType"("leave_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LeaveRequest" ADD CONSTRAINT "LeaveRequest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LeaveRequest" ADD CONSTRAINT "LeaveRequest_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "public"."User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
