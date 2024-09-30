import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { Meal } from "./meal.model";
import { MealsService } from "./meals.service";
import {Public} from "../auth/decorators/public.decorator";



@Controller("meals")
export class MealsController {
    constructor(private readonly mealsService: MealsService) {}

    @Public()
    @Get()
    getAll():  Promise<Meal[]> {
        const allMeals = this.mealsService.getAll();
        return allMeals;
    }

    @Get(":id")
    getById(@Param("id") id: string) : Promise<Meal> {
        const foundMeal = this.mealsService.getById(id);

        return foundMeal;
    }

    // @Get("category/:categoryId")
    // getAllByCategoryId(@Param("categoryId", ParseIntPipe) categoryId: number): Promise<Meal[]> {
    //     const foundMeals = this.mealsService.getAllByCategoryId(categoryId);
    //
    //     return foundMeals;
    // }

    @Public()
    @Get("/category/:strCategory")
    getAllByStrCategory(@Param("strCategory") strCategory: string): Promise<Meal[]> {

        const allMeals = this.mealsService.getAllByStrCategory(strCategory);

        return allMeals;
    }

    @Post("add")
    add(@Body() meal: Meal) {
        // console.log("meal backend: ", meal);
        // return null;
        const newMeal = this.mealsService.addMeal(meal);

        return newMeal;
    }


}