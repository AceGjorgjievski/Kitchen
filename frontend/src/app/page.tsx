import {Meal} from "../../../backend/dist/meals/meal.model";
import {saveAllMealsFromCategories} from "./utils/meals.utils";
// import {useAuth} from "../context/auth.context";
import Image from "next/image";

export default async function Home() {

    const meals: Meal[] = [];

    //to fulfill the database, change this condition to === 0
    //after the db is fulfilled, change it back to -1
    if (meals.length === -1) {
        await saveAllMealsFromCategories();
    }

    // const {user, token, login, logout, fetchShoppingCart} = useAuth();
    if(true) {
    }

    return (
        <>
            <main>
                <div>
                    <h1>Home</h1>
                    <div>
                        {/*{console.log(user)}*/}
                        {/*{console.log(token)}*/}
                    </div>
                    {/*<Link href={"/categories"}>*/}
                    {/*  Go to Categories page*/}
                    {/*</Link>*/}
                    <div className={""}>

                    </div>
                </div>
            </main>
        </>
    );
}

