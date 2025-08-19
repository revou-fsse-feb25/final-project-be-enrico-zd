import {
  AttendanceBy,
  AttendanceStatus,
  EmployeeType,
  Gender,
  StatusApproval,
  PaidLeave,
  PrismaClient,
  Role,
  StatusActive,
  UserType,
  WorkSpace,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash('password', 10);
  // Company
  const company1 = await prisma.company.create({
    data: {
      company_name: 'PT Asep Jaya',
      company_owner: 'Budi Korner',
      company_address: 'Jl. Mawar No. 1, Jakarta',
      company_email: 'contact@asepjaya.com',
      company_phone: '081234561827',
      web_url: 'https://asepjaya.com',
      npwp: '01.234.567.8-999.000',
      status: StatusActive.ACTIVE,
    },
  });

  await prisma.company.create({
    data: {
      company_name: 'PT asbun Jaya',
      company_owner: 'Jamal Korner',
      company_address: 'Jl. Mawar No. 1, Jakarta',
      company_email: 'contact@asbunjaya.com',
      company_phone: '081234561827',
      web_url: 'https://asbunjaya.com',
      npwp: '01.234.567.8-999.000',
      status: StatusActive.ACTIVE,
    },
  });

  // Shift
  const shift1 = await prisma.shift.create({
    data: {
      company_id: company1.company_id,
      title: 'Shift Pagi',
      opening_time: new Date(`1970-01-01T08:00:00Z`),
      closing_time: new Date(`1970-01-01T16:00:00Z`),
      status: StatusActive.ACTIVE,
    },
  });

  // Users
  const user1 = await prisma.user.create({
    data: {
      nik: '1234567890123456',
      family_card_number: '9876543210987654',
      employment_number: 'EMP001',
      passport_number: 'A1234567',
      name: 'Jamal Suemal',
      address: 'Jl. Menteng No. 12',
      email: 'jamal@example.com',
      phone_number: '081912345678',
      date_of_birth: new Date('1990-05-10'),
      gender: Gender.MALE,
      username: 'jamals',
      password: hashed,
      role: Role.STAFF,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      nik: '2234567890123456',
      family_card_number: '9876543210987655',
      employment_number: 'EMP002',
      passport_number: 'B9876543',
      name: 'Siti Rahmawati',
      address: 'Jl. Melati No. 45',
      email: 'siti@example.com',
      phone_number: '081934567890',
      date_of_birth: new Date('1992-07-21'),
      gender: Gender.FEMALE,
      username: 'sitir',
      password: hashed,
      role: Role.ADMIN,
    },
  });

  // Employment (UserCompanyDetail)
  await prisma.userCompanyDetail.createMany({
    data: [
      {
        user_id: user1.user_id,
        company_id: company1.company_id,
        employee_type: EmployeeType.PERMANENT,
        user_type: UserType.FIELD,
        joining_date: new Date('2022-01-15'),
        leaving_date: null,
        shift_id: shift1.shift_id,
        workspace: WorkSpace.OFFICE,
        user_status: StatusActive.ACTIVE,
        employee_username: 'jamals',
      },
      {
        user_id: user2.user_id,
        company_id: company1.company_id,
        employee_type: EmployeeType.CONTRACT,
        user_type: UserType.NONFIELD,
        joining_date: new Date('2023-02-10'),
        leaving_date: null,
        shift_id: shift1.shift_id,
        workspace: WorkSpace.HOME,
        user_status: StatusActive.ACTIVE,
        employee_username: 'sitir',
      },
    ],
  });

  // Attendance
  await prisma.attendance.createMany({
    data: [
      {
        user_id: user1.user_id,
        company_id: company1.company_id,
        attendance_date: new Date('2025-08-12'),
        check_in_at: new Date(`1970-01-01T08:15:00Z`),
        check_out_at: new Date(`1970-01-01T17:05:00Z`),
        shift_id: shift1.shift_id,
        attendance_status: AttendanceStatus.PRESENT,
        attendance_by: AttendanceBy.SELF,
        hours_work_min: 480,
        late_minute: 5,
        overtime_min: 60,
        status: StatusApproval.APPROVED,
      },
      {
        user_id: user2.user_id,
        company_id: company1.company_id,
        attendance_date: new Date('2025-08-12'),
        check_in_at: new Date(`1970-01-01T08:45:00Z`),
        check_out_at: new Date(`1970-01-01T16:30:00Z`),
        shift_id: shift1.shift_id,
        attendance_status: AttendanceStatus.LATE,
        attendance_by: AttendanceBy.SELF,
        hours_work_min: 450,
        late_minute: 15,
        overtime_min: 0,
        status: StatusApproval.APPROVED,
      },
    ],
  });

  // Leave Type
  const annualLeave = await prisma.leaveType.create({
    data: {
      company_id: company1.company_id,
      leave_type_name: 'Annual Leave',
      paid_leave: PaidLeave.YES,
      leave_allocated_day: 12,
    },
  });

  // Leave Request
  await prisma.leaveRequest.create({
    data: {
      leave_type_id: annualLeave.leave_type_id,
      company_id: company1.company_id,
      user_id: user1.user_id,
      reason: 'Family vacation',
      proof_image: 'ticket.png',
      from: new Date('2025-08-20T00:00:00Z'),
      to: new Date('2025-10-25T00:00:00Z'),
      requested_days: 3,
      status: StatusApproval.PENDING,
      approved_by: null,
      approved_at: null,
    },
  });

  console.log('✅ Seeding selesai!');
}

main()
  .then(() => console.log('Seeding completed successfully.'))
  .catch((e) => {
    (console.error(e), process.exit(1));
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
