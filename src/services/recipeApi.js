import axios from "axios";
import { useEffect } from "react";

export const fetchRecipes = async (query) => {
    const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    )
    return res.data.meals || [];
}

export const fetchCategories = async () => {
    const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
    )
    return res.data.categories || []
}

export const fetchByCategory = async (category) => {
    const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    )
    return res.data.meals || [];
}

export const fetchByIngredient = async (ingredient) => {
    const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    )
    return res.data.meals || [];
}