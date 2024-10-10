"use client";

import {Box, Typography, ButtonGroup, Button, Grid, CircularProgress} from "@mui/material";
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
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategoryAll, setSelectedCategoryAll] = useState(false);

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
        setLoading(true);
        setSelectedCategory(categoryId);
        setSelectedCategoryAll(false);
        const mealsForCategory = await getMealsByCategoryFromDb(categoryId);
        setMeals(mealsForCategory);
        setLoading(false);
    };

    const handleSettingAllMeals = async () => {
        setLoading(true);
        setSelectedCategoryAll(true);
        setSelectedCategory(null);
        const allCategories: Category[] = await getCategoriesFromApi();
        const allMeals: Meal[] = [];
        for (const category of allCategories) {
            const mealsByCategory: Meal[] = await getMealsByCategoryFromDb(category.strCategory);
            allMeals.push(...mealsByCategory);
        }
        setMeals(allMeals);
        setLoading(false);
    }


    return (
        <main>
            <Box sx={{mt: 8, textDecoration: "none"}}>
                <Typography className={classes.textSmall} sx={{
                    color: 'whitesmoke',
                    fontFamily: 'Montserrat',
                    fontSize: { xs: '14px', sm: '16px', md: '20px' },
                    mt: 10,
                }}>
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
                                <Button onClick={handleSettingAllMeals}
                                        style={{backgroundColor: selectedCategoryAll ? 'lightgray': ''}}>
                                    All
                                </Button>
                            </Grid>
                            {categories.map((category) => {
                                return (
                                    <CategoryData
                                        key={category.id}
                                        category={category}
                                        selectedCategory={selectedCategory}  // Pass the selected category
                                        buttonStyle="lightgray"
                                        onCategoryClick={handleCategoryClick}
                                    />
                                );
                            })}
                        </Grid>
                    </Box>
                </ButtonGroup>
                {loading ? (
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
                        <CircularProgress/>
                    </Box>
                ) : (
                    <CategoryMealData meals={meals}/>
                )}
            </Box>
        </main>
    );
};

export default Categories;
