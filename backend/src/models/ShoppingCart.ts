import {ShoppingCartDto} from "./ShoppingCartDto";

export class ShoppingCart {
    constructor(
        public id: string,
        public userId: string,
        public shoppingCartItems: ShoppingCartDto[],
        public createdAt: string
    ) {
    }
}