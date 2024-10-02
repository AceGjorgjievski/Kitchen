
export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    role: string;
}

export interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    categoryId: number;
    strCategory: string;
    rating: number;
    reviews: number;
    price: number;
}

export interface Category {
    id: number;
    strCategory: string;
}

export interface ShoppingCartItems {//dto
    shoppingCartId: string;
    mealId: string;
    mealImage: string;
    mealName: string;
    quantity: number;
    price: number;
}

export enum OrderState {
    Issued = 'Issued',
    Dispatched = 'Dispatched',
    Delivered = 'Delivered',
    Canceled = 'Canceled'
}

export interface Order {
    id: string,
    totalPrice: number,
    shoppingCartItems: ShoppingCartItems[],
    createdAt: string,
    userId: string,
    userName: string,
    userEmail: string,
    orderState: OrderState
}
