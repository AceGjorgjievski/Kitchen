"use client";

import {Box, Typography, ButtonGroup, Button, Grid} from "@mui/material";
import {Category} from "../../../../backend/src/categories/category.model";
import CategoryData from "../components/CategoryData";
import {getCategoriesFromApi, getCategoriesFromDb} from "../utils/categories.utils";
import useStyles from "../styles/styles";
import {useEffect, useState} from "react";
import {getMealsByCategoryFromDb} from "../utils/meals.utils";
import {Meal} from "../types/types";
import CategoryMealData from "../components/CategoryMealData";


const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [meals, setMeals] = useState<Meal[]>([]);
    const classes = useStyles();

    useEffect(() => {
        const fetchCategories = async () => {
            // Check if categories are already in localStorage or a cache
            const cachedCategories = localStorage.getItem("categories");

            if (cachedCategories) {
                setCategories(JSON.parse(cachedCategories));
            } else {
                // Fetch data from Firebase if not in cache
                const categoriesFromDb = await getCategoriesFromDb();
                setCategories(categoriesFromDb);
                // Save to localStorage to avoid refetching
                localStorage.setItem("categories", JSON.stringify(categoriesFromDb));
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = async (categoryId) => {
        const mealsForCategory = await getMealsByCategoryFromDb(categoryId);
        setMeals(mealsForCategory);
    };

    const handleSettingAllMeals = async () => {
        const allCategories: Category[] = await getCategoriesFromApi();
        const allMeals: Meal[] = [];
        for(const category of allCategories) {
            const mealsByCategory: Meal[] = await getMealsByCategoryFromDb(category.strCategory);
            allMeals.push(...mealsByCategory);
        }
        setMeals(allMeals);
    }


    return (
        <main>
            <Box sx={{mt: 8, textDecoration: "none"}}>
                <Typography className={classes.textSmall}>
                    Explore our specialties
                </Typography>
                <ButtonGroup variant="contained" aria-label="Basic button group" sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    mt: '70px',
                    textDecoration: 'none'
                }}>
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Button onClick={handleSettingAllMeals}>
                                    All
                                </Button>
                            </Grid>
                            {categories.map((category) => {
                                return (
                                    <CategoryData
                                        key={category.id}
                                        category={category}
                                        onCategoryClick={handleCategoryClick}
                                    />
                                );
                            })}
                        </Grid>
                    </Box>
                </ButtonGroup>
                <CategoryMealData meals={meals}/>
            </Box>
        </main>
    );
};

export default Categories;
