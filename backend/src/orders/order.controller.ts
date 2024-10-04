import {Body, Controller, Get, Headers, Post} from "@nestjs/common";
import {Order} from "../models/Order";
import {OrderService} from "./order.service";
import {OrderDto} from "../models/OrderDto";


@Controller("orders")
export class OrderController {
    constructor(private readonly orderService: OrderService) {
    }


    @Get("all")
    getAll(): Promise<Order[]> {
        const allOrders = this.orderService.getAll();
        return allOrders;
    }

    @Post("add")
    add(
        @Headers('Authorization') authHeader: string,
        @Body() body: OrderDto
    ): Promise<Order> {
        const addedOrder = this.orderService.add(body, authHeader);

        return addedOrder;
    }

    @Get("currentUser")
    async listAllOrdersForCurrentUser(
        @Headers('Authorization') authHeader: string
    ): Promise<Order[]> {
        const allOrders = await this.orderService.listAllOrdersForCurrentUser(authHeader);

        return allOrders;
    }

    @Post("updateOrderState")
    async updateOrderState (
        @Headers('Authorization') authHeader: string,
        @Body() body: any
    ): Promise<Partial<Order>> {
        const updatedOrder = await this.orderService.updateOrderState(authHeader, body);

        return updatedOrder;
    }
}
