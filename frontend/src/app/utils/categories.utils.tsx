import {FULL_DOMAIN} from "./constants.utils";


const CATEGORIES_URL = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
const BACKEND_URL_CATEGORIES = FULL_DOMAIN + "/categories";
const BACKEND_URL_MEALS = FULL_DOMAIN + "/meals/category/";


export const getCategoriesFromApi = async () => {

    const response = await fetch(CATEGORIES_URL);

    const data = await response.json();

    const allCategories = data.meals.map((category: {strCategory: string}, index: number) => {
        return {id: index + 1, strCategory: category.strCategory}
    })

    return allCategories;
}

export const saveCategories = async () => {
    const allCategories = await getCategoriesFromApi();

    for(const category of allCategories) {
        await fetch(BACKEND_URL_CATEGORIES + "/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        })
    }

    console.log("categories saved in db");

}

export const getCategoriesFromDb = async () => {
    const response = await fetch(BACKEND_URL_CATEGORIES, {
        method: 'GET',
        cache: 'no-cache'
    });
    const data = await response.json();

    return data;
}

export const getMealsByCategoryFromDb = async (category: string) => {
        try {
            const response = await fetch(BACKEND_URL_MEALS + category, {
                method: 'GET',
                cache: 'no-cache',
            });

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



