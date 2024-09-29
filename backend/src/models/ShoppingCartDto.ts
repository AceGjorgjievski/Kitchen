export class ShoppingCartDto {
    constructor(
        public id: string,
        public mealId: string,
        public mealImage: string,
        public quantity: number,
        public price: number
    ) {
    }
}