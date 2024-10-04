import {FULL_DOMAIN} from "./constants.utils";
import {Order, OrderState} from "../types/types";

const BACKEND_ORDER_URL = FULL_DOMAIN + "/orders";

export const addToOrder = async (
    shoppingCart: any | undefined,
    totalPrice: number | undefined,
    createdAt: string | undefined,
    token: string | undefined
) => {

    try {
        const orderData = {
            "totalPrice": totalPrice,
            "shoppingCartItems": shoppingCart.shoppingCartItems,
            "createdAt": createdAt
        }

        console.log("order data: ", orderData);
        const response = await fetch(BACKEND_ORDER_URL + "/add", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })


        const data = await response.json();
        console.log("order data: ", data);

    } catch (err) {
        console.log("Error adding shopping cart items in order: ", err);
    }

}

export const fetchAllOrdersForAdmins = async (token: string) => {
    try {
        const response = await fetch(BACKEND_ORDER_URL + "/all", {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            console.log("Cannot fetch all orders!");
        }

        const data = await response.json();

        return data;

    } catch (err) {
        console.log("Cannot fetch all orders for Admins!");
    }
}

export const fetchAllOrdersForNonAdmins = async (token: string) => {
    try {
        const response = await fetch(BACKEND_ORDER_URL + "/currentUser", {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            console.log("Cannot fetch all orders!");
        }

        const data = await response.json();
        return data;

    } catch (err) {
        console.log("Cannot fetch all orders for Non-Admins!");
    }
}

export const updateOrderStateBackend = async (order: Order, newState: OrderState, token: string) => {
    try {

        const orderData = {
            "order": order,
            "newState": newState,
        }

        const response = await fetch(BACKEND_ORDER_URL + "/updateOrderState", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })

        if(!response.ok) {
            console.log("Cannot update order state");
        }

        const data = await response.json();
        return data;

    } catch (err) {
        console.log("Cannot update order state");
    }
}

