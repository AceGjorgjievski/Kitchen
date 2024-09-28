import { Module } from "@nestjs/common";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {FirestoreModule} from "../firestore/firestore.module";
import {FirebaseModule} from "../firebase/firebase.module";
import {FirestoreService} from "../firestore/firestore.service";


@Module({
    imports: [FirestoreModule, FirebaseModule],
    controllers: [UsersController],
    providers: [UsersService, FirestoreService],
    exports: [UsersService]
})
export class UsersModule {}