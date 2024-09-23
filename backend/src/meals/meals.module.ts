import { Module } from "@nestjs/common";
import { MealsController } from "./meals.controller";
import { MealsService } from "./meals.service";
import {FirestoreModule} from "../firestore/firestore.module";
import {CategoryService} from "../categories/categories.service";


@Module({
    imports: [FirestoreModule],
    controllers: [MealsController],
    providers: [MealsService, CategoryService]
})
export class MealsModule {

}