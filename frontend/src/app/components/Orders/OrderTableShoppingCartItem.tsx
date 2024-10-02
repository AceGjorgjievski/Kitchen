import React from 'react';
import {ShoppingCartItems} from "../../types/types";

interface OrderTableShoppingCartItemProps {
    item: ShoppingCartItems
}

const OrderTableShoppingCartItem = ({item}: OrderTableShoppingCartItemProps) => {
    return (
        <>
            <div key={item.mealId}>
                {item.mealName} (Qty: {item.quantity}, Price: {item.price} USD)
            </div>
        </>
    );
};

export default OrderTableShoppingCartItem;


