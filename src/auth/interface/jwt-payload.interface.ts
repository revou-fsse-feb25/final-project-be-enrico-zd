import { Role } from '@prisma/client';

export interface JwtPayload {
  sub: number;
  company_id: number;
  username: string;
  role?: Role;
  type: 'access' | 'refresh';
}
