export class ShoppingCartDto {
    constructor(
        public shoppingCartId: string,
        public mealId: string,
        public mealImage: string,
        public mealName: string,
        public quantity: number,
        public price: number
    ) {
    }
}