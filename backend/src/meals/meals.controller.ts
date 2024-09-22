import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { Meal } from "./meal.model";
import { MealsService } from "./meals.service";



@Controller("meals")
export class MealsController {
    constructor(private readonly mealsService: MealsService) {}


    @Get()
    getAll(): Meal [] {
        const allMeals = this.mealsService.getAll();
        return allMeals;
    }

    @Get(":id")
    getById(@Param("id") id: string) : Meal {
        const foundMeal = this.mealsService.getById(id);

        return foundMeal;
    }

    @Get("category/:categoryId")
    getAllByCategoryId(@Param("categoryId", ParseIntPipe) categoryId: number): Meal [] {
        const foundMeals = this.mealsService.getAllByCategoryId(categoryId);

        return foundMeals;
    }

    @Post("add")
    add(@Body() meal: Meal) {
        const newMeal = this.mealsService.addMeal(meal);

        return newMeal;
    }


}