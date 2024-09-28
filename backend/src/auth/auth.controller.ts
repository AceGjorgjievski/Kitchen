import {Body, Controller, Get, Post, Headers, UnauthorizedException, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {User} from "../models/User";
import {UserRegisterDto} from "../models/UserRegisterDto";
import {UserLoginDto} from "../models/UserLoginDto";
import {Public} from "./decorators/public.decorator";
import {FirebaseService} from "../firebase/firebase.service";
import {AuthGuardService} from "./guards/authGuard.service";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly firebaseService: FirebaseService) {}

  @Get("current")
  @UseGuards(AuthGuardService)
  public async getCurrentUser(@Headers('Authorization') authHeader: string): Promise<Omit<User, 'password'>> {
    const token = authHeader.replace('Bearer ', '');
    if(!token) {
      throw new UnauthorizedException('No token provided');
    }

    const currentUser = this.firebaseService.checkLoggedInUser(token);
    return currentUser;
  }

  @Public()
  @Post("login")
  public login(@Body() body: UserLoginDto): Promise<Omit<User, "password">> {
    const loggedInUser = this.authService.login(body);
    return loggedInUser;
  }

  @Public()
  @Post("register")
  public register(@Body() body: UserRegisterDto): Promise<Omit<User, 'password'>> {
    const registeredUser = this.authService.register(body);
    return registeredUser;
  }

  @Post('logout')
  @UseGuards(AuthGuardService)
  public async logout(@Headers('Authorization') authHeader: string): Promise<{ message: string }> {
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    await this.authService.logout(token); // Pass the token to revoke it
    return { message: 'User logged out successfully' };
  }
}
