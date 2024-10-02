import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useAuth} from "../../../context/auth.context";
import {Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {addToOrder} from "../../utils/orders.utils";
import {useRouter} from "next/navigation";
import {emptyShoppingCartItems} from "../../utils/shoppingCart.utils";

interface ShoppingCartDrawerProps {
    open: boolean;
    toggleDrawer: (open: boolean) => void;
}

// ShoppingCartDrawer component
export default function ShoppingCartDrawer({
                                               open,
                                               toggleDrawer
                                           }: ShoppingCartDrawerProps) {

    const {shoppingCart, token, user, fetchShoppingCart} = useAuth();
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const router = useRouter();

    // List for displaying the items

    useEffect(() => {

        if(!user) {
            router.push("/login");
        }
        if (shoppingCart?.shoppingCartItems) {
            const allShoppingCartItems = shoppingCart.shoppingCartItems;
            var totalPrice = 0;
            for(const shoppingCartItem of allShoppingCartItems) {
                totalPrice += shoppingCartItem.price * shoppingCartItem.quantity;
            }
            setTotalPrice(totalPrice);
        }
    }, [shoppingCart]);


    const handleAddToOrders = async () => {
        console.log("Make Order clicked");

        console.log("sc: ", shoppingCart);

        if(user) {
            await addToOrder(
                shoppingCart,
                Number(totalPrice.toFixed(2)),
                new Date().toDateString(),
                token
            );
            console.log("finishes adding in order");
            await emptyShoppingCartItems(token);
            fetchShoppingCart();
        } else {
            router.push("/login");
        }
    }

    const list = () => (
        <Box
            sx={{ width: 350, height: '100%', display: 'flex', flexDirection: 'column' }}
            role="presentation"
            onClick={() => toggleDrawer(false)}
            onKeyDown={() => toggleDrawer(false)}
        >
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                <List>
                    {user && shoppingCart && shoppingCart.shoppingCartItems?.length > 0 ? (
                        shoppingCart.shoppingCartItems.map((item, index) => (
                            <ListItem key={item.mealId} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <img src={item.mealImage} alt={item.mealId} style={{ width: 50, height: 50 }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`Meal Name: ${item.mealName}`}
                                        secondary={`Quantity: ${item.quantity} | Price: $${!isNaN(parseFloat(item.price)) ? parseFloat(item.price).toFixed(2) : 'N/A'}`}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))
                    ) : (
                        <ListItem>
                            <ListItemText primary="Your shopping cart is empty." />
                        </ListItem>
                    )}
                </List>
            </Box>

            {/* Static footer section for total and order button */}
            <Divider />
            <Box sx={{ padding: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h7">
                        {/*Total Items: {shoppingCart?.shoppingCartItems?.length || 0}*/}
                        Total items: {user && shoppingCart && (
                            shoppingCart.shoppingCartItems.reduce((total, item) => total + item.quantity, 0)
                    ) }
                    </Typography>
                    <Typography variant="h7">
                        Total Price: ${totalPrice.toFixed(2)}
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={shoppingCart?.shoppingCartItems?.length === 0}
                    onClick={(event) => {
                        event.stopPropagation();
                        handleAddToOrders();
                    }}
                >
                    Make Order
                </Button>
            </Box>
        </Box>
    );

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={() => toggleDrawer(false)}
        >
            {list()}
        </Drawer>
    );
}
