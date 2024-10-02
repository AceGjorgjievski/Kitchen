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

    @Get()
    getByUser(
        @Headers('Authorization') authHeader: string
    ): Promise<Order> {
        const foundOrder = this.orderService.findByUserId(authHeader);
        return foundOrder;
    }

    @Post("add")
    add(
        @Headers('Authorization') authHeader: string,
        @Body() body: OrderDto
    ): Promise<Order> {
        const addedOrder = this.orderService.add(body, authHeader);

        return addedOrder;
    }
}
