import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Meal } from "./meal.model";


@Injectable()
export class MealsService {
    private meals : Meal [] = [
        {
            "strMeal": "Chick-Fil-A Sandwich",
            "strMealThumb": "https:\/\/www.themealdb.com\/images\/media\/meals\/sbx7n71587673021.jpg",
            "idMeal": "53016",
            "categoryId": 1,
            "rating": 3,
            "reviews": 12
        },
        {
            "strMeal": "Chicken Couscous",
            "strMealThumb": "https:\/\/www.themealdb.com\/images\/media\/meals\/qxytrx1511304021.jpg",
            "idMeal": "52850",
            "categoryId": 2,
            "rating": 5,
            "reviews": 8
        }
    ];

    getAll() : Meal [] {
        return [...this.meals];
    }

    getById(id: string): Meal | undefined {

        const foundMeal: Meal = this.meals.find((meal) => meal.idMeal === id);

        if(!foundMeal) {
            throw new NotFoundException(`Meal does not exist with id: ${id}`)
        }

        return {...foundMeal};
    }

    getAllByCategoryId(categoryId: number): Meal [] {
        const foundMeals : Meal [] = this.meals.filter((meal) => meal.categoryId === categoryId);

        if(foundMeals.length === 0) {
            throw new NotFoundException(`No meals were found with the category id: ${categoryId}`);
        }

        return [...foundMeals];
    }

    addMeal(meal: Meal): Meal {
        const foundMeal = this.meals.find((existingMeal) => existingMeal.idMeal === meal.idMeal);
        if(foundMeal) {
            throw new ConflictException(`Meal with id: ${meal.idMeal} already exists`);
        }

        const newMeal: Meal = {
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strMealThumb: meal.strMealThumb,
            categoryId: meal.categoryId,
            rating: meal.rating,
            reviews: meal.reviews
        }

        this.meals.push(newMeal);

        return newMeal;

    }


}
