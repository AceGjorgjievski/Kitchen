import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {FirebaseService} from "../firebase/firebase.service";
import {ConfigModule} from "@nestjs/config";
import {FirestoreModule} from "../firestore/firestore.module";
import {UsersModule} from "../users/users.module";
import {JwtService} from "@nestjs/jwt";

@Module({
  imports: [ConfigModule, FirestoreModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, FirebaseService, JwtService],
})
export class AuthModule {}
