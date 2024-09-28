import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CategoryModule} from './categories/categories.module';
import {MealsModule} from './meals/meals.module';
import {FirestoreModule} from './firestore/firestore.module';
import {AuthModule} from "./auth/auth.module";
import {APP_GUARD, Reflector} from "@nestjs/core";
import {AuthGuardService} from "./auth/guards/authGuard.service";
import {FirebaseModule} from "./firebase/firebase.module";
import {ConfigModule} from "@nestjs/config";
import {UsersModule} from "./users/users.module";

@Module({
    imports: [CategoryModule, MealsModule, FirestoreModule,
        AuthModule, FirebaseModule, ConfigModule.forRoot({
            isGlobal: true
        }),
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService,
        {
            provide: APP_GUARD,
            useClass: AuthGuardService
        },
        Reflector
    ]
})
export class AppModule {
}
