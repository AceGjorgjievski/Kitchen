"use client";

import {Category} from "../types/types";
import {Button, Grid} from "@mui/material";

interface CategoryDataProps {
    category: Category,
    onCategoryClick: (strCategory: string) => {};
}

const CategoryData = ({ category, onCategoryClick }: CategoryDataProps) => {

    return (
        <>
            <Grid item>
                <Button onClick={() => onCategoryClick(category.strCategory)}>
                    {category.strCategory}
                </Button>
            </Grid>
        </>
    );
};

export default CategoryData;
