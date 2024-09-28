import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Meal } from "./meal.model";
import { FirestoreService } from "src/firestore/firestore.service";
import {Category} from "../categories/category.model";
import {CategoryService} from "../categories/categories.service";

@Injectable()
export class MealsService {
    constructor(private readonly firestoreService: FirestoreService,
                private readonly categoryService: CategoryService) {}

    async getAll(): Promise<Meal[]> {
        const allMeals: Meal [] = [];
        const allCategories : Category[] = await this.categoryService.getAll();

        for(const category of allCategories) {
            const meals = await this.firestoreService.getDocuments('meals'+category.strCategory);
            const categoryMeals = meals.map(doc => ({
                idMeal: doc.data().idMeal,
                strMeal: doc.data().strMeal,
                strMealThumb: doc.data().strMealThumb,
                categoryId: doc.data().categoryId,
                strCategory: doc.data().strCategory,
                rating: doc.data().rating,
                reviews: doc.data().reviews,
                price: doc.data().price
            }));

            allMeals.push(...categoryMeals);
        }

        return allMeals;
    }

    async getById(id: string): Promise<Meal> {
        const foundMeal = await this.firestoreService.getDocument('meals', id);
        if (!foundMeal) {
            throw new NotFoundException(`Meal does not exist with id: ${id}`);
        }

        return {
            idMeal: foundMeal.idMeal,
            strMeal: foundMeal.strMeal,
            strMealThumb: foundMeal.strMealThumb,
            categoryId: foundMeal.categoryId,
            strCategory: foundMeal.strCategory,
            rating: foundMeal.rating,
            reviews: foundMeal.reviews,
            price: foundMeal.price
        };
    }

    async getAllByStrCategory(strCategory: string): Promise<Meal[]> {

        const meals = await this.firestoreService.getDocuments('meals' + strCategory);
        if(!meals || meals.length === 0) {
            throw new NotFoundException(`No meals found with category: ${strCategory}`)
        }

        const categoryMeals = meals.map(doc => ({
            idMeal: doc.data().idMeal,
            strMeal: doc.data().strMeal,
            strMealThumb: doc.data().strMealThumb,
            categoryId: doc.data().categoryId,
            strCategory: doc.data().strCategory,
            rating: doc.data().rating,
            reviews: doc.data().reviews,
            price: doc.data().price
        }))

        return categoryMeals;
    }

    async getAllByCategoryId(categoryId: number): Promise<Meal[]> {
        const meals: Meal[] = await this.getAll(); // Fetch all meals first (consider optimizing if necessary)
        const foundMeals: Meal[] = meals.filter(meal => meal.categoryId === categoryId);

        if (foundMeals.length === 0) {
            throw new NotFoundException(`No meals were found with the category id: ${categoryId}`);
        }

        return foundMeals;
    }

    async addMeal(meal: Meal): Promise<Meal> {

        const meals: Meal[] = await this.getAll();
        const foundMeal: Meal | undefined = meals.find(existingMeal => existingMeal.idMeal === meal.idMeal);
        if (foundMeal) {
            throw new ConflictException(`Meal with id: ${meal.idMeal} already exists`);
        }

        const newMeal: Meal = {
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strMealThumb: meal.strMealThumb,
            categoryId: meal.categoryId,
            strCategory: meal.strCategory,
            rating: meal.rating,
            reviews: meal.reviews,
            price: meal.price
        };


        await this.firestoreService.addDocument('meals' + newMeal.strCategory, null, newMeal); // Save to Firestore

        console.log("meal added: ");
        return newMeal;
    }
}
