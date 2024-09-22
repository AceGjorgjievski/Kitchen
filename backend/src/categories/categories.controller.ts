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
    addCategory(@Body() category: Omit<Category, "id">): Promise<Category> {
        const newCategory = this.categoryService.add(category.strCategory);

        return newCategory;
    }

    // @Get(":id")
    // getById(@Param("id", ParseIntPipe) id: number) : Category {
    //     const foundCategory = this.categoryService.getById(id);

    //     return foundCategory;
    // }


}
