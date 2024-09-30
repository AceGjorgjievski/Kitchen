import {Body, Controller, Get, Headers, Param, Post, UseGuards} from "@nestjs/common";
import {ShoppingCartService} from "./shoppingCart.service";
import {ShoppingCart} from "../models/ShoppingCart";
import {ShoppingCartDto} from "../models/ShoppingCartDto";


@Controller("shoppingCart")
export class ShoppingCartController {

    constructor(private readonly shoppingCartService: ShoppingCartService) {
    }

    @Get("all")
    getAllShoppingCarts(): Promise<ShoppingCart[]> {
        const allShoppingCarts = this.shoppingCartService.getAll();
        return allShoppingCarts;
    }

    @Get("current")
    getShoppingCartByUserId(
        @Headers('Authorization') authHeader: string
    ): Promise<ShoppingCart | undefined> {
        const foundShoppingCart = this.shoppingCartService.getByUserId(authHeader);
        return foundShoppingCart;
    }

    @Get("/totalPrice")
    getTotalPrice(
        @Headers('Authorization') authHeader: string
    ): Promise<number> {
        const totalAmount = this.shoppingCartService.calculateTotalPrice(authHeader);
        return totalAmount;
    }

    @Post("add")
    async add(
        @Body() body: ShoppingCartDto,
        @Headers('Authorization') authHeader: string
    ) : Promise<{message: string}> {

        await this.shoppingCartService.addMealToCart(body);

        return { message: 'Meal successfully added to shopping cart!' };
    }
}