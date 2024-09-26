import { Injectable } from '@nestjs/common';
import {User} from "../models/User";
import {UserRegisterDto} from "../models/UserRegisterDto";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    UserCredential
} from 'firebase/auth';
import {FirebaseService} from "../firebase/firebase.service";
import {FirestoreService} from "../firestore/firestore.service";
import {UserLoginDto} from "../models/UserLoginDto";

@Injectable()
export class AuthService {

    constructor(private readonly firebaseService: FirebaseService,
                private readonly firestoreService: FirestoreService) {
    }


    async login(body: UserLoginDto): Promise<Omit<User, "password">> {
        try {
            const user: UserCredential = await signInWithEmailAndPassword(
                this.firebaseService.auth,
                body.email,
                body.password
            )

            const loggedInUser: Omit<User, "password"> = {
                id: user.user.uid,
                email: user.user.email,
                name: user.user.displayName,
                createdAt: user.user.metadata.creationTime
            }

            return loggedInUser;
        } catch (err) {
            throw new Error("Error in login: " + err);
        }
    }

    async register(body: UserRegisterDto): Promise<Omit<User, 'password'>> {


        try {
            const userCredential: UserCredential = await createUserWithEmailAndPassword(
                this.firebaseService.auth,
                body.email,
                body.password
            );

            const user = userCredential.user;

            const userData: Omit<User, 'password'> = {
                name: body.name,
                email: body.email,
                id: user.uid,
                createdAt: new Date().toDateString()
            }

            await this.firestoreService.addDocument("users", user.uid, userData);

            return userData;
        } catch (err) {
            throw new Error("Error in register: " + err);
        }

    }
}
