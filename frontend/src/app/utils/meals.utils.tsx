import {getCategoriesFromDb} from "./categories.utils";
import {Meal} from "../../../../backend/src/meals/meal.model";
import {Category} from "../../../../backend/src/categories/category.model";
import {FULL_DOMAIN} from "./constants.utils";


const MEALS_API_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
const BACKEND_URL_MEALS = FULL_DOMAIN + "/meals";



export const getMealsByCategoryFromApi = async (category: Category) => {
    const response = await fetch(`${MEALS_API_URL}${category.strCategory}`, {
        cache: 'no-cache'
    });
    const data = await response.json();

    if (data.meals) {
        const meals: Meal []= data.meals.map((meal: { strMeal: string, strMealThumb: string, idMeal: string}) => ({
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strMealThumb: meal.strMealThumb,
            categoryId: category.id,
            strCategory: category.strCategory,
            reviews: Math.floor(Math.random() * 18) + 3,
            rating: Math.floor(Math.random() * 5) + 1,
            price: (Math.random() * (45 - 10) + 10).toFixed(2)
        }));
        return meals;
    }
    return [];
}

export const saveMeals = async (meals: any[]) => {
    for (const meal of meals) {
        try {
            console.log("meal frontend: ", meal);

            const response = await fetch(BACKEND_URL_MEALS + "/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(meal)
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to save meal. Status: ${response.status}, Message: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error saving meal:", error);
        }
    }
};


export const saveAllMealsFromCategories = async () => {
    let categories: Category[] = await getCategoriesFromDb();

    for (const category of categories) {
        const meals = await getMealsByCategoryFromApi(category);

        if (meals.length > 0) {
            await saveMeals(meals);
            console.log(`Saved ${meals.length} meals for category: ${category.strCategory}`);
        } else {
            console.log(`No meals found for category: ${category}`);
        }
    }

    console.log("All meals saved to the database.");
}

export const getMealsFromDB = async () => {
    const response = await fetch(BACKEND_URL_MEALS, {
        method: 'GET',
        cache: 'no-cache'
    });
    const data = await response.json();

    return data;
}

export const getMealsByCategoryFromDb = async (category: string) => {
    try {
        const response = await fetch(BACKEND_URL_MEALS + "/category" + "/" + category, {
            method: 'GET',
            cache: 'no-cache',
        });

        console.log("path: ", BACKEND_URL_MEALS + "/category" + category);

        if (!response.ok) {
            throw new Error("Failed to fetch meals in [getMealsByCategoryFromDb]");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in getMealsByCategoryFromDb:", error.message);
        throw error;
    }
}


