import Link from "next/link";
import {getCategoriesFromDb, saveCategories} from "./utils/categories.utils";
import {Category} from "../../../backend/src/categories/category.model";

export default async function Home() {

  let categories: Category[] = await getCategoriesFromDb();

  console.log(categories.length);
  if(categories.length === 0) {
    await saveCategories();
    categories = await getCategoriesFromDb();
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
