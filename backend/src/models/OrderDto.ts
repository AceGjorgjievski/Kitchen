import {ShoppingCartDto} from "./ShoppingCartDto";

export class OrderDto {
    constructor(
        public totalPrice: number,
        public shoppingCartItems: ShoppingCartDto[],
        public createdAt: string
    ) {
    }
}
