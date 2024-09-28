import {Controller, Get, Query, UseGuards} from "@nestjs/common";
import {UsersService} from "./users.service";
import {User} from "../models/User";
import {CurrentUserDecorator} from "../auth/decorators/currentUser.decorator";
import {AuthGuardService} from "../auth/guards/authGuard.service";

@Controller("users")
export class UsersController {

    constructor(private readonly usersService: UsersService) {
    }

    @Get()
    async getUsers(
        @Query("name") name?: string,
        @Query("email") email?: string
    ): Promise<Promise<Array<Omit<User, "password">>> | Promise<Omit<User, "password">>>{
        if (name) {
            // If 'name' is provided, search by name
            return this.usersService.getUserByName(name);
        } else if (email) {
            // If 'email' is provided, search by email
            return this.usersService.getUserByEmail(email);
        } else {
            // If no query parameter is provided, return all users
            return this.usersService.getAll();
        }
    }

    @Get("current")
    getCurrentProfile(@CurrentUserDecorator() user: User) {
        return user;
    }

}
