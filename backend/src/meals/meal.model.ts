
export class Meal {
    constructor (
        public idMeal: string,
        public strMeal: string,
        public strMealThumb: string,
        public categoryId: number,
        public strCategory: string,
        public rating: number,
        public reviews: number,
        public price: number
    ) {

    }
}
