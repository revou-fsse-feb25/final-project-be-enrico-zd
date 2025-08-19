import { Expose } from 'class-transformer';

export class UserResponseDTO {
  @Expose()
  user_id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phone_number: string;

  @Expose()
  gender: string;

  @Expose()
  username: string;
}
