import { FULL_DOMAIN } from "./constants.utils";
import { useAuth } from "../../context/auth.context";

const BACKEND_URL_SHOPPING_CART = FULL_DOMAIN + "/shoppingCart";

export const addMealToShoppingCart = async (
    shoppingCartId: string | undefined,
    mealId: string | undefined,
    mealImage: string | undefined,
    mealName: string | undefined,
    quantity: number | undefined,
    price: number | undefined,
    token: string | undefined,
    fetchShoppingCart: () => void,
) => {
    try {
        const response = await fetch(BACKEND_URL_SHOPPING_CART + "/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                shoppingCartId,
                mealId,
                mealImage,
                mealName,
                quantity,
                price
            }),
        });

        // If the token is expired, we may get a 401 Unauthorized response

        if (!response.ok) {
            if (response.status === 401) {
                console.log("Token expired, refreshing...");
                const {refreshToken} = useAuth();
                refreshToken();
                // Attempt to refresh the token
                // const newToken = await user.getIdToken(true); // Refresh the token
                // console.log("New token: ", newToken);

                // Retry the request with the new token
                const retryResponse = await fetch(BACKEND_URL_SHOPPING_CART + "/add", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        shoppingCartId,
                        mealId,
                        mealImage,
                        mealName,
                        quantity,
                        price
                    }),
                });

                if (!retryResponse.ok) {
                    throw new Error(`Failed to add meal after token refresh: ${retryResponse.statusText}`);
                }

                const result = await retryResponse.json();
                console.log(result.message);
            } else {
                throw new Error(`Failed to add meal in [addMealToShoppingCart]: ${response.statusText}`);
            }
        } else {
            const result = await response.json();
            console.log(result.message);
        }
        console.log("before fetching");
        fetchShoppingCart();
    } catch (err) {
        console.log("Error adding meal to cart: ", err);
    }
};

export const calculateTotalPriceInShoppingCart = async () => {


    try {
        const {token} = useAuth();
        const response = await fetch(BACKEND_URL_SHOPPING_CART + '/totalPrice', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const data = await response.json();
        console.log("totalAmount front: ", data);
    } catch (err) {
        console.log("Error calculating total price in shopping cart: ", err);
    }
}

export const emptyShoppingCartItems = async (token: string) => {

    try {

        console.log("path: ",BACKEND_URL_SHOPPING_CART + "/clear")

        console.log("token: ", token);
        const response = await fetch(BACKEND_URL_SHOPPING_CART+'/clear', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })

        const data = await response.json();
        console.log("data clearing: ", data);


    } catch (err) {
        console.log("Error clearing shopping cart items");
    }
}
