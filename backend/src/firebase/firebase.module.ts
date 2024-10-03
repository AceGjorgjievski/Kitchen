import {Module} from "@nestjs/common";
import {FirebaseService} from "./firebase.service";
import {UsersService} from "../users/users.service";
import {FirestoreService} from "../firestore/firestore.service";


@Module({
    providers: [FirebaseService, UsersService, FirestoreService],
    exports: [FirebaseService]
})
export class FirebaseModule {

}