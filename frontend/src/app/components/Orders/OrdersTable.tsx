import {Order, OrderState, User} from "../../types/types";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Box, MenuItem, Select} from "@mui/material";
import OrderTableShoppingCartItem from "./OrderTableShoppingCartItem";
import React, {useState} from "react";

interface OrderTableProps {
    orders: Order[];
    user: User;
    handleOrderStateChange: (order: Order, newState: OrderState) => void;
}

const OrderTable = ({orders, user, handleOrderStateChange}: OrderTableProps) => {

    const [selectedOrderState, setSelectedOrderState] = useState<OrderState>(OrderState.Issued);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>, order: Order) => {
        const newState = event.target.value as OrderState;
        setSelectedOrderState(newState);
        handleOrderStateChange(order, newState);
    };


    return (
        <>
            <Box sx={{mx: 2, mt: 4}}>
                <TableContainer>
                    <Table sx={{minWidth: 650, border: "1px solid white"}} aria-label="orders table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{color: 'white'}}>Order No.</TableCell>
                                {
                                    user && user.role === 'admin' &&
                                    (
                                        <>
                                            <TableCell align="right" sx={{color: 'white'}}>User</TableCell>
                                        </>
                                    )
                                }
                                <TableCell align="right" sx={{color: 'white'}}>Created At</TableCell>
                                <TableCell align="right" sx={{color: 'white'}}>Meals</TableCell>
                                <TableCell align="right" sx={{color: 'white'}}>Total Price</TableCell>
                                <TableCell align="right" sx={{color: 'white'}}>Order State</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order, index) => (
                                <TableRow
                                    key={index}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row" sx={{color: 'white'}}>
                                        {index + 1}
                                    </TableCell>
                                    {
                                        user && user.role === 'admin' &&
                                        (
                                            <>
                                                <TableCell align={"right"} component="th" scope="row" sx={{color: 'white'}}>
                                                    {order.userEmail}
                                                </TableCell>
                                            </>
                                        )
                                    }
                                    <TableCell align="right" sx={{color: 'white'}}>
                                        {new Date(order.createdAt).toLocaleString()}
                                    </TableCell>
                                    <TableCell align="right" sx={{color: 'white'}}>
                                        {order.shoppingCartItems.map(item => (
                                            <OrderTableShoppingCartItem key={item.mealId} item={item}/>
                                        ))}
                                    </TableCell>
                                    <TableCell align="right" sx={{color: 'white'}}>
                                        {order.totalPrice.toFixed(2)} USD
                                    </TableCell>
                                    {
                                        user && user.role === 'admin' ? (
                                            <TableCell align="right" sx={{color: 'white'}}>
                                                <Select
                                                    value={order.orderState}
                                                    onChange={(e) => {
                                                        handleChange(e, order);
                                                    }}
                                                    sx={{
                                                        color: 'white',
                                                        border: "1px solid white"
                                                    }} // Customize styles as needed
                                                >
                                                    {Object.keys(OrderState).map((state) => (
                                                        <MenuItem key={state} value={state}>
                                                            {state}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </TableCell>
                                        ) : (
                                            <TableCell align="right" sx={{color: 'white'}}>
                                                {order.orderState}
                                            </TableCell>
                                        )
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default OrderTable;
