import { SignUpDto } from './dto/sign-up.dto';
import {
  createHashedPassword,
  validatePassword,
} from 'src/utils/hashed-password';
import { UsersService } from 'src/user/users.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { LoginResponseType } from './types/login-response.type';
import { User } from '@prisma/client';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(data: SignUpDto): Promise<void> {
    await this.userService.create({
      ...data,
      password: await createHashedPassword(data.password),
    });
  }

  async login(email: string, password: string): Promise<LoginResponseType> {
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new NotFoundException('No user found');
    }

    const valid = await validatePassword(password, user.password);

    if (!valid) {
      throw new UnauthorizedException('Incorrect password');
    }

    const token = this.jwtService.sign({ id: user.id, role: user.role });

    return { token, user };
  }

  async updateProfile(id: number, data: UpdateProfileDto): Promise<User> {
    const user = await this.userService.update({
      where: { id },
      data,
    });

    return user;
  }
}
