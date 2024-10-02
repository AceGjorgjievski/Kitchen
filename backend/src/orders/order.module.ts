import {Module} from "@nestjs/common";
import {OrderService} from "./order.service";
import {OrderController} from "./order.controller";
import {FirestoreModule} from "../firestore/firestore.module";
import {FirebaseModule} from "../firebase/firebase.module";


@Module({
    imports: [FirestoreModule, FirebaseModule],
    providers: [OrderService],
    controllers: [OrderController]
})
export class OrderModule {}
