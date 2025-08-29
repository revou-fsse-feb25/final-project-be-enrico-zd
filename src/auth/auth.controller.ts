import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDTO } from './dto/req/auth.dto';
import { SerializationInterceptor } from 'src/common/interceptors/serialization.interceptors';

@UseInterceptors(SerializationInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerCompany(@Body() data: RegisterDTO) {
    return this.authService.registerCompany(data);
  }

  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
