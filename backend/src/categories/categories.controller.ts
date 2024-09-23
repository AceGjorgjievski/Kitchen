import {Body, Controller, Get, Param, ParseIntPipe, Post} from "@nestjs/common";
import {Category} from "./category.model";
import {CategoryService} from "./categories.service";


@Controller("categories")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {
    }


    @Get()
    getAllCategories(): Promise<Category []> {
        const allCategories = this.categoryService.getAll();
        return allCategories;
    }

    @Post("add")
    addCategory(@Body() category: Category): Promise<Category> {
        const newCategory = this.categoryService.add(category);

        return newCategory;
    }

    @Get(":id")
    getById(@Param("id", ParseIntPipe) id: number) : Promise<Category> {
        const foundCategory = this.categoryService.getById(id);

        return foundCategory;
    }


}
