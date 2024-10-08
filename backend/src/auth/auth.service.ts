import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {User} from "../models/User";
import {UserRegisterDto} from "../models/UserRegisterDto";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    UserCredential,
    signOut,
    updateProfile
} from 'firebase/auth';
import {FirebaseService} from "../firebase/firebase.service";
import {FirestoreService} from "../firestore/firestore.service";
import {UserLoginDto} from "../models/UserLoginDto";
import firebase from "firebase/compat";
import AuthError = firebase.auth.AuthError;
import {UsersService} from "../users/users.service";
import * as admin from 'firebase-admin';
import {ShoppingCart} from "../models/ShoppingCart";

@Injectable()
export class AuthService {

    constructor(private readonly firebaseService: FirebaseService,
                private readonly firestoreService: FirestoreService,
                private readonly usersService: UsersService) {
    }

    async validateUser({ email, password }: UserLoginDto) {
        const user = await this.usersService.getUserByEmail(email);
        if (!user) {
            throw new HttpException(`User not found with email: ${email}`, HttpStatus.NOT_FOUND);
        }

        return user;
    }


    async login(body: UserLoginDto): Promise<Omit<User, "password">> {
        try {
            const user: UserCredential = await signInWithEmailAndPassword(
                this.firebaseService.auth,
                body.email,
                body.password
            )


            const accessToken = await user.user.getIdToken();

            const dbUser = await this.usersService.getUserByEmail(user.user.email);

            if(dbUser) {
                await updateProfile(user.user, {
                    displayName: dbUser.name
                })
            }

            const loggedInUser: Omit<User, "password" | "accessToken"> & { accessToken: string } = {
                id: user.user.uid,
                email: user.user.email,
                name: user.user.displayName,
                role: dbUser.role,
                createdAt: user.user.metadata.creationTime,
                accessToken,
                shoppingCartId: dbUser.shoppingCartId
            };

            return loggedInUser;

        } catch (err) {
            const firebaseAuthError = err as AuthError;
            console.log("LOGIN error code: ", firebaseAuthError.code);
            if(firebaseAuthError.code === 'auth/wrong-password') {
                throw new HttpException("Email or password incorrect", HttpStatus.FORBIDDEN);
            }

            if (firebaseAuthError.code === 'auth/user-not-found') {
                throw new HttpException('Email not found.', HttpStatus.NOT_FOUND);
            }

            if(firebaseAuthError.code === 'auth/invalid-credential') {
                throw new HttpException("Invalid credentials", HttpStatus.NOT_FOUND);
            }
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
                role: "user",
                createdAt: new Date().toDateString(),
                shoppingCartId: user.uid
            }

            await this.firestoreService.addDocument("users", user.uid, userData);

            const shoppingCart: ShoppingCart = {
                id: user.uid,
                userId: user.uid,
                username: body.name,
                shoppingCartItems: [],
                createdAt: new Date().toDateString(),
                totalPrice: 0
            }

            await this.firestoreService.addDocument("shoppingCarts", user.uid, shoppingCart);

            return userData;
        } catch (err) {
            const firebaseAuthError = err as AuthError;

            if (firebaseAuthError.code === 'auth/email-already-in-use') {
                throw new HttpException('Email already exists.', HttpStatus.CONFLICT);
            }
        }

    }

    async logout(token: string): Promise<void> {
        try {
            // Verify the token to extract the user ID (uid)
            const decodedToken = await admin.auth().verifyIdToken(token);

            // Revoke the user's refresh tokens
            await admin.auth().revokeRefreshTokens(decodedToken.uid);
        } catch (err) {
            throw new UnauthorizedException('Error in logout: ' + err);
        }
    }
}
