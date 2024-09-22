import { Module } from "@nestjs/common";
import { FirestoreController } from "./firestore.controller";
import { FirestoreService } from "./firestore.service";


@Module({
    controllers: [FirestoreController],
    providers: [FirestoreService],
    exports: [FirestoreService]
})
export class FirestoreModule {}