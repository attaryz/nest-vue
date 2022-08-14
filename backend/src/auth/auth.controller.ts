import { UserService } from './../user/user.service';
import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './models/register.dto';
@Controller()
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    if (body.password !== body.confirm_password) {
      throw new Error('Passwords do not match');
    }

    // hash the password
    const hash = await bcrypt.hash(body.password, 12);
    return this.userService.create({
      // create a new user with the hashed password
      ...body,
      password: hash,
    });
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error('Incorrect password');
    }
  }
}
