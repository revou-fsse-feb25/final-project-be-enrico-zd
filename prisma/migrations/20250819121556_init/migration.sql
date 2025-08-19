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
CREATE TYPE "public"."StatusApproval" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

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
    "company_address" TEXT,
    "company_email" TEXT NOT NULL,
    "company_phone" TEXT NOT NULL,
    "web_url" VARCHAR(255),
    "npwp" VARCHAR(50),
    "payroll_date" INTEGER DEFAULT 1,
    "status" "public"."StatusActive" NOT NULL DEFAULT 'ACTIVE',
    "general_holiday" "public"."Holiday" NOT NULL DEFAULT 'SUNDAY',
    "image_company" TEXT DEFAULT 'https://tsicosek65.ufs.sh/f/9OL1U8bKcTC4l9C9PM53JscT2EdMP8BLnt9uYifwR6K5N0p4',
    "is_delete" BOOLEAN NOT NULL DEFAULT false,
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
    "avatar" TEXT DEFAULT 'https://tsicosek65.ufs.sh/f/9OL1U8bKcTC4BjCjHrwy1ahUIZfoPJ8Vg3FNurbWDcLyntjv',
    "gender" "public"."Gender" NOT NULL DEFAULT 'MALE',
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "last_login" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    "employee_username" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCompanyDetail_pkey" PRIMARY KEY ("user_company_id")
);

-- CreateTable
CREATE TABLE "public"."Attendance" (
    "attendance_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "attendance_date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "check_in_at" TIME(0),
    "check_out_at" TIME(0),
    "shift_id" INTEGER,
    "attendance_status" "public"."AttendanceStatus" NOT NULL DEFAULT 'ABSENT',
    "attendance_by" "public"."AttendanceBy" NOT NULL,
    "hours_work_min" INTEGER NOT NULL DEFAULT 0,
    "late_minute" INTEGER NOT NULL DEFAULT 0,
    "overtime_min" INTEGER NOT NULL DEFAULT 0,
    "status" "public"."StatusApproval" NOT NULL DEFAULT 'PENDING',
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
    "leave_allocated_day" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeaveType_pkey" PRIMARY KEY ("leave_type_id")
);

-- CreateTable
CREATE TABLE "public"."LeaveRequest" (
    "leave_request_id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "leave_type_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "reason" TEXT,
    "proof_image" TEXT,
    "from" TIMESTAMP(0) NOT NULL,
    "to" TIMESTAMP(0) NOT NULL,
    "request_date" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requested_days" INTEGER NOT NULL,
    "status" "public"."StatusApproval" NOT NULL DEFAULT 'PENDING',
    "approved_by" INTEGER,
    "approved_at" TIMESTAMP(0),
    "admin_remark" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeaveRequest_pkey" PRIMARY KEY ("leave_request_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_company_name_key" ON "public"."Company"("company_name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_company_email_key" ON "public"."Company"("company_email");

-- CreateIndex
CREATE INDEX "Company_status_idx" ON "public"."Company"("status");

-- CreateIndex
CREATE INDEX "Shift_company_id_idx" ON "public"."Shift"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "Shift_shift_id_company_id_key" ON "public"."Shift"("shift_id", "company_id");

-- CreateIndex
CREATE UNIQUE INDEX "Shift_company_id_title_key" ON "public"."Shift"("company_id", "title");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "public"."User"("role");

-- CreateIndex
CREATE INDEX "UserCompanyDetail_user_id_company_id_idx" ON "public"."UserCompanyDetail"("user_id", "company_id");

-- CreateIndex
CREATE INDEX "UserCompanyDetail_company_id_shift_id_idx" ON "public"."UserCompanyDetail"("company_id", "shift_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserCompanyDetail_company_id_employee_username_key" ON "public"."UserCompanyDetail"("company_id", "employee_username");

-- CreateIndex
CREATE UNIQUE INDEX "UserCompanyDetail_user_id_company_id_user_status_key" ON "public"."UserCompanyDetail"("user_id", "company_id", "user_status");

-- CreateIndex
CREATE INDEX "Attendance_user_id_attendance_date_idx" ON "public"."Attendance"("user_id", "attendance_date");

-- CreateIndex
CREATE INDEX "LeaveType_company_id_idx" ON "public"."LeaveType"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "LeaveType_company_id_leave_type_name_key" ON "public"."LeaveType"("company_id", "leave_type_name");

-- CreateIndex
CREATE UNIQUE INDEX "LeaveType_leave_type_id_company_id_key" ON "public"."LeaveType"("leave_type_id", "company_id");

-- CreateIndex
CREATE INDEX "LeaveRequest_company_id_request_date_idx" ON "public"."LeaveRequest"("company_id", "request_date");

-- CreateIndex
CREATE INDEX "LeaveRequest_user_id_request_date_idx" ON "public"."LeaveRequest"("user_id", "request_date");

-- CreateIndex
CREATE INDEX "LeaveRequest_leave_type_id_company_id_idx" ON "public"."LeaveRequest"("leave_type_id", "company_id");

-- CreateIndex
CREATE INDEX "LeaveRequest_status_idx" ON "public"."LeaveRequest"("status");

-- AddForeignKey
ALTER TABLE "public"."Shift" ADD CONSTRAINT "Shift_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."Company"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserCompanyDetail" ADD CONSTRAINT "UserCompanyDetail_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserCompanyDetail" ADD CONSTRAINT "UserCompanyDetail_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."Company"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserCompanyDetail" ADD CONSTRAINT "UserCompanyDetail_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "public"."Shift"("shift_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attendance" ADD CONSTRAINT "Attendance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attendance" ADD CONSTRAINT "Attendance_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "public"."Shift"("shift_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LeaveType" ADD CONSTRAINT "LeaveType_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."Company"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LeaveRequest" ADD CONSTRAINT "LeaveRequest_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."Company"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LeaveRequest" ADD CONSTRAINT "LeaveRequest_leave_type_id_company_id_fkey" FOREIGN KEY ("leave_type_id", "company_id") REFERENCES "public"."LeaveType"("leave_type_id", "company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LeaveRequest" ADD CONSTRAINT "LeaveRequest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LeaveRequest" ADD CONSTRAINT "LeaveRequest_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "public"."User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
