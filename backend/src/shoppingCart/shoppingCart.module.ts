import {Module} from "@nestjs/common";
import {ShoppingCartService} from "./shoppingCart.service";
import {ShoppingCartController} from "./shoppingCart.controller";
import {FirebaseModule} from "../firebase/firebase.module";
import {FirestoreModule} from "../firestore/firestore.module";


@Module({
    imports: [FirestoreModule, FirebaseModule],
    providers: [ShoppingCartService],
    controllers: [ShoppingCartController],
    exports: [ShoppingCartService]
})
export class ShoppingCartModule {}
