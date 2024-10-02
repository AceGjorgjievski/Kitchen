import {ShoppingCartDto} from "./ShoppingCartDto";
import {OrderState} from "./enums/OrderState";

export class Order {
    constructor(
        public id: string,
        public totalPrice: number,
        public shoppingCartItems: ShoppingCartDto[],
        public createdAt: string,
        public userId: string,
        public orderState: OrderState
    ) {
    }
}