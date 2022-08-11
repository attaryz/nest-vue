import { UserService } from './../user/user.service';
import { Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
@Controller()
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() body) {
    // hash the password
    const hash = await bcrypt.hash(body.password, 12);
    return this.userService.create({
      // create a new user with the hashed password
      ...body,
      password: hash,
    });
  }
}
