"use client"

import useStyles from "../styles/styles";
import {Box, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {Order, OrderState} from "../types/types";
import {useAuth} from "../../context/auth.context";
import {fetchAllOrdersForNonAdmins, fetchAllOrdersForAdmins, updateOrderStateBackend} from "../utils/orders.utils";
import OrderTable from "../components/Orders/OrdersTable";
import {useRouter} from "next/navigation";

const Orders = () => {
    const classes = useStyles();
    const {user, token} = useAuth();

    const [orders, setOrders] = useState<Order[]>([])
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrdersForAdmins = async (token: string) => {
            const response = await fetchAllOrdersForAdmins(token);
            setOrders(response);
        }

        const fetchOrdersForNonAdmins = async (token: string) => {
            const response = await fetchAllOrdersForNonAdmins(token);
            setOrders(response);
        }

        const handleFetchOrders = async () => {
            if (user) {
                if (user.role === 'admin') {
                    await fetchOrdersForAdmins(token);
                } else {
                    await fetchOrdersForNonAdmins(token);
                }
                setLoading(false);
            }
        }

        if (user === null) {
            return;
        }

        if (!user) {
            router.push("/login");
        } else {
            handleFetchOrders();
        }
    }, [user, token, router, orders]);

    const updateOrderState = async (order: Order, newState: OrderState) => {
        try {
            // Call an API to update the order state in the backend
            await updateOrderStateBackend(order, newState, token);
            console.log(`Order ${order.id} updated to state ${newState}`);
            const response = user.role === 'admin'
                ? await fetchAllOrdersForAdmins(token)
                : await fetchAllOrdersForNonAdmins(token);

            setOrders(response);
        } catch (error) {
            console.error("Failed to update order state", error);
        }
    };



    return (
        <>
            <Box sx={{mt: 12, textDecoration: "none"}}>
                <Typography className={classes.textSmall} sx={{
                    color: 'whitesmoke',
                    fontFamily: 'Montserrat',
                    fontSize: { xs: '14px', sm: '16px', md: '20px' },
                    mt: 10,
                }}>
                    Your current order list
                </Typography>
            </Box>
            <OrderTable
                orders={orders}
                user={user}
                handleOrderStateChange={updateOrderState}
            />
        </>
    );
};

export default Orders;

