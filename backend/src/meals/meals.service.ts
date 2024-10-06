import {ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {Meal} from "./meal.model";
import {FirestoreService} from "src/firestore/firestore.service";
import {CategoryService} from "../categories/categories.service";

@Injectable()
export class MealsService {
    constructor(private readonly firestoreService: FirestoreService,
                private readonly categoryService: CategoryService) {
    }


    async getAll(): Promise<Meal[]> {
        const allMeals: Meal[] = [];
        const allMealCategories = await this.firestoreService.getDocuments("meals");

        for (const mealCategory of allMealCategories) {
            const fetchedMeals =
                await this.firestoreService.getDocuments(`meals/${mealCategory}/${mealCategory}Collection/`)

            const categoryMeals = fetchedMeals.map(doc => ({
                idMeal: doc.data().idMeal,
                strMeal: doc.data().strMeal,
                strMealThumb: doc.data().strMealThumb,
                categoryId: doc.data().categoryId,
                strCategory: doc.data().strCategory,
                rating: doc.data().rating,
                reviews: doc.data().reviews,
                price: doc.data().price
            }))

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


    async getAllByStrCategory(strCategory: string) : Promise<Meal[]> {

        const allMealsByCategory = [];

            const mealsByCategory =
                await this.firestoreService
                    .getDocuments(`meals/${strCategory}/${strCategory}Collection`);

            mealsByCategory.map(doc => {
                const data = doc.data();
                allMealsByCategory.push({
                    idMeal: data.idMeal,
                    strMeal: data.strMeal,
                    strMealThumb: data.strMealThumb,
                    categoryId: data.categoryId,
                    strCategory: data.strCategory,
                    rating: data.rating,
                    reviews: data.reviews,
                    price: data.price
                })
            })

        return allMealsByCategory;

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
        try {
            const mealCategoriesDoc =
                await this.firestoreService
                    .getDocuments(`meals/${meal.strCategory}/${meal.strCategory}Collection`)

            if(!mealCategoriesDoc) {
                await this.firestoreService.addDocument(`${meal.strCategory}Collection`, meal.idMeal, {
                    mealId: meal.idMeal
                });
            }

            await this.firestoreService
                .addDocument(`meals/${meal.strCategory}/${meal.strCategory}Collection`,null, meal)

            console.log("meal added: ", meal);

            return meal;
        } catch (err) {
            throw new ConflictException(`Error adding meal with id: ${meal.idMeal}`)
        }
    }
}
