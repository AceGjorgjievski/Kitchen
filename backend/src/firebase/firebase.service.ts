import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {FirebaseApp, initializeApp} from 'firebase/app';
import {IConfig} from "../models/config.model";
import {Auth, getAuth} from 'firebase/auth';

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

}
