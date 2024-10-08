import {FULL_DOMAIN} from "./constants.utils";


const CATEGORIES_URL = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
const BACKEND_URL_CATEGORIES = FULL_DOMAIN + "/categories";


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
    try {
        const response = await fetch(BACKEND_URL_CATEGORIES, {
            method: 'GET',
            cache: 'no-cache',
        });

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Failed to fetch categories:", error);

        // Optionally, return an empty array or handle the error in a specific way
        return [];
    }
};





