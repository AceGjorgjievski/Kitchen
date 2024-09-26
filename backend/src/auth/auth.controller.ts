import {Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import {User} from "../models/User";
import {UserRegisterDto} from "../models/UserRegisterDto";
import {UserLoginDto} from "../models/UserLoginDto";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  public login(@Body() body: UserLoginDto): Promise<Omit<User, "password">> {
    const loggedInUser = this.authService.login(body);
    return loggedInUser;
    // return "test login";
  }

  @Post("register")
  public register(@Body() body: UserRegisterDto): Promise<Omit<User, 'password'>> {
    const registeredUser = this.authService.register(body);
    return registeredUser;
    // return JSON.stringify(body);
  }
}
