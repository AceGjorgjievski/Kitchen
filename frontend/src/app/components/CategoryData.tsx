"use client";

import {Category} from "../types/types";
import {Button, Grid} from "@mui/material";

interface CategoryDataProps {
    category: Category,
    onCategoryClick: (strCategory: string) => {};
}

const CategoryData = ({ category, onCategoryClick, selectedCategory, buttonStyle }: CategoryDataProps) => {

    const isSelected = selectedCategory === category.strCategory;
    const buttonColor = isSelected ? buttonStyle : '';

    return (
        <>
            <Grid item>
                <Button onClick={() => onCategoryClick(category.strCategory)} style={{backgroundColor: `${buttonColor}`}}>
                    {category.strCategory}
                </Button>
            </Grid>
        </>
    );
};

export default CategoryData;
