import { Role } from '@prisma/client';
import { Expose } from 'class-transformer';

export class UserResponseDTO {
  @Expose()
  user_id: number;

  @Expose()
  nik: string;

  @Expose()
  family_card_number: string;

  @Expose()
  employment_number: string;

  @Expose()
  passport_number: string;

  @Expose()
  address: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phone_number: string;

  @Expose()
  date_of_birth: Date;

  @Expose()
  gender: Role;

  @Expose()
  avatar: string;

  @Expose()
  username: string;

  @Expose()
  role: Role;
}
