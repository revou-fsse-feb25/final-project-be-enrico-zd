-- AlterTable
ALTER TABLE "public"."Company" ADD COLUMN     "general_holiday" "public"."Holiday" NOT NULL DEFAULT 'SUNDAY',
ALTER COLUMN "company_address" DROP NOT NULL,
ALTER COLUMN "company_phone" DROP NOT NULL,
ALTER COLUMN "payroll_date" DROP NOT NULL,
ALTER COLUMN "image_company" SET DEFAULT 'https://tsicosek65.ufs.sh/f/9OL1U8bKcTC4l9C9PM53JscT2EdMP8BLnt9uYifwR6K5N0p4';

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "avatar" SET DEFAULT 'https://tsicosek65.ufs.sh/f/9OL1U8bKcTC4BjCjHrwy1ahUIZfoPJ8Vg3FNurbWDcLyntjv',
ALTER COLUMN "gender" SET DEFAULT 'MALE';
