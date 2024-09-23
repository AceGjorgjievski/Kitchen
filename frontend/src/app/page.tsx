import Link from "next/link";
import {getCategoriesFromDb, saveCategories} from "./utils/categories.utils";
import {Category} from "../../../backend/src/categories/category.model";
import {Meal} from "../../../backend/src/meals/meal.model";
import {saveAllMealsFromCategories} from "./utils/meals.utils";

export default async function Home() {

  let categories: Category[] = await getCategoriesFromDb();
  let meals: Meal [] = [];

  if(categories.length === 0) {
    await saveCategories();
  }

  if(meals.length === 0) {
      await saveAllMealsFromCategories();
  }


  return (
    <>
      <main>
        <div>
          <h1>Home</h1>
          <Link href={"/categories"}>
            Go to Categories page
          </Link>
        </div>
      </main>
    </>
  );
}
