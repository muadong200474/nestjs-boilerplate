import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginResponseType } from './types/login-response.type';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto): Promise<LoginResponseType> {
    return this.authService.login(data.email, data.password);
  }

  @Post('register')
  async register(@Body() data: SignUpDto): Promise<void> {
    return this.authService.signUp(data);
  }
}
