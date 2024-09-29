import {Injectable, UnauthorizedException} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {FirebaseApp, initializeApp} from 'firebase/app';
import {IConfig} from "../models/config.model";
import {Auth, getAuth} from 'firebase/auth';
import * as admin from 'firebase-admin';
import {User} from "../models/User";

@Injectable()
export class FirebaseService {

    public app: FirebaseApp;
    public auth: Auth

    constructor(private readonly configService: ConfigService<IConfig>) {
        this.app = initializeApp( {
            apiKey: configService.get<string>('apiKey'),
            authDomain: configService.get<string>('authDomain'),
            projectId: configService.get<string>('projectId'),
            storageBucket: configService.get<string>('storageBucket'),
            messagingSenderId: configService.get<string>('messagingSenderId'),
            appId: configService.get<string>('appId'),
            measurementId: configService.get<string>('measurementId'),
        })
        this.auth = getAuth(this.app);

    }

    async checkLoggedInUser(idToken: string): Promise<Omit<User, 'password'>> {
        try {
            // Verify the ID token
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            // Retrieve the user record from Firebase
            const userRecord = await admin.auth().getUser(decodedToken.uid);

            const loggedInUser: Omit<User, "password" | "accessToken"> & { accessToken: string } = {
                id: userRecord.uid,
                email: userRecord.email,
                name: userRecord.displayName,
                role: 'user',
                createdAt: userRecord.metadata.creationTime,
                accessToken: idToken,
                shoppingCartId: userRecord.uid
            };

            return loggedInUser;
        } catch (error) {
            throw new UnauthorizedException('No valid user session found.');
        }
    }

    async verifyToken(token: string) {
        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            return decodedToken;
        } catch (err) {
            throw new UnauthorizedException('Invalid or expired token!');
        }
    }

}
