import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { LoginDto, RegisterDTO } from './dto/req/auth.dto';
import { Role, User } from '@prisma/client';
import { CompanyService } from 'src/company/company.service';
import { comparePassword } from 'src/utils/password-hash';
import { UserCompanyDetailService } from 'src/user-company-detail/user-company-detail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly companyService: CompanyService,
    private readonly userCompDetailService: UserCompanyDetailService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async registerCompany(registerDto: RegisterDTO): Promise<{
    access_token: string;
    user: User;
  }> {
    const { company_name, full_name, address, email, phone_number } =
      registerDto;

    const existingCompany =
      await this.companyService.findCompanyByName(company_name);

    if (existingCompany) {
      throw new ConflictException('Company is already exist');
    }

    const newCompany = await this.companyService.createCompany({
      company_name: company_name,
      company_owner: full_name,
      company_address: address,
      company_email: email,
      company_phone: phone_number,
    });

    const NewUserDetail =
      await this.userCompDetailService.findUserCompByCompanyId(
        newCompany.company_id,
      );

    if (!NewUserDetail) {
      throw new NotFoundException('User Detail Not Found');
    }

    const Newuser = await this.userService.findUserById(NewUserDetail.user_id);

    if (!Newuser) {
      throw new NotFoundException('User Not Found');
    }

    const token = this.jwtService.sign(
      {
        sub: Newuser.user_id,
        company_id: newCompany.company_id,
        username: Newuser.username,
        role: Newuser.role,
        type: 'access',
      },
      { expiresIn: '1d' },
    );
    return {
      access_token: token,
      user: Newuser,
    };
  }

  async login(user: LoginDto): Promise<{
    tokens: {
      access_token: string;
      refresh_token: string;
    };
    user: User;
  }> {
    const { company_name, username, password } = user;

    const existingCompany =
      await this.companyService.findCompanyByName(company_name);

    if (!existingCompany) {
      throw new UnauthorizedException('Company Not Found');
    }

    const userExistInCompany =
      await this.userCompDetailService.findUserCompByUserIdAndCompanyId(
        username,
        existingCompany.company_id,
      );

    if (!userExistInCompany) {
      throw new UnauthorizedException('User not in this company');
    }

    const existingUser = await this.userService.findUserById(
      userExistInCompany.user_id,
    );

    if (!existingUser) {
      throw new UnauthorizedException('Invalid email or password');
    }

    await this.userService.updateUser(existingUser.user_id, {
      last_login: new Date(),
    });

    if (!existingUser.password) {
      throw new UnauthorizedException('Password not set for this user');
    }

    const isPasswordValid = await comparePassword(
      password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const tokens = await this.generateToken({
      user_id: existingUser.user_id,
      company_id: existingCompany.company_id,
      username: existingUser.username,
      role: existingUser.role,
    });

    await this.userService.updateUser(existingUser.user_id, {
      refresh_token: tokens.refresh_token,
    });

    return {
      tokens,
      user: existingUser,
    };
  }

  private async generateToken(user: {
    user_id: number;
    company_id: number;
    username: string;
    role: Role;
  }) {
    const payload = {
      sub: user.user_id,
      company_id: user.company_id,
      username: user.username,
      role: user.role,
      type: 'access',
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(
        { ...payload, type: 'refresh' },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }
}
