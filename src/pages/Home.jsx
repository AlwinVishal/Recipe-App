import React, { use, useEffect, useState } from 'react'

import NavBar from '../components/NavBar';
import RecipeCard from '../components/RecipeCard';
import { fetchByCategory, fetchByIngredient, fetchCategories, fetchRecipes } from '../services/recipeApi';
import RecipeDetails from './RecipeDetails';

function Home() {

    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [ingredient, setIngredient] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);

    useEffect(() => {
        const getCategories = async () => {

            const data = await fetchCategories();

            setCategories(data);
        }
        getCategories();
    }, [])

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            let data;

            if (category) {
                data = await fetchByCategory(category);
            }
            else if (ingredient) {
                data = await fetchByIngredient(ingredient);
            }
            else {
                data = await fetchRecipes(searchTerm);
            }

            setRecipes(data || []);
            setLoading(false);
        }

        getData();
    }, [searchTerm, category, ingredient])


    useEffect(() => {
        if (category || ingredient) return;

        const uniqueIngredients = new Set();

        recipes.forEach(recipe => {
            Object.keys(recipe).forEach(key => {
                if (key.startsWith("strIngredient")) {
                    const ing = recipe[key];

                    if (ing && ing.trim() !== "") {
                        uniqueIngredients.add(ing.toLowerCase());
                    }
                }
            });
        });

        setIngredients([...uniqueIngredients]);
    }, [recipes, category, ingredient]);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites])

    useEffect(() => {
        const stored = localStorage.getItem("favorites");

        try {
            const parsed = stored ? JSON.parse(stored) : [];
            setFavorites(parsed);
        }
        catch (error) {
            console.error("Error parsing favorites:", error);
            setFavorites([]);
            localStorage.removeItem("favorites");
        }

    }, []);

    const filteredRecipes = recipes.filter(recipe =>
        recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
        setIsOpen(true);
    }

    const toggleFavorite = (recipe) => {
        const exists = favorites.find(fav => fav.idMeal === recipe.idMeal);

        if (exists) {
            setFavorites(favorites.filter(fav => fav.idMeal !== recipe.idMeal))
        }
        else {
            setFavorites([...favorites, recipe]);
        }
    }

    const displayRecipes = showFavorites ? favorites : filteredRecipes;

    return (
        <>
            <NavBar
                setSearchTerm={setSearchTerm}
                setCategory={setCategory}
                categories={categories}
                setIngredient={setIngredient}
                ingredients={ingredients}
                category={category}
                ingredient={ingredient}
                showFavorites={showFavorites}
                setShowFavorites={setShowFavorites}
                favorites={favorites}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">

                {
                    loading && recipes.length === 0 ? (
                        <p className="text-center col-span-full">
                            Loading...
                        </p>
                    ) : displayRecipes.length === 0 ? (
                        <p className="text-center col-span-full">
                            {showFavorites ? "No favorites yet" : "No recipes found"}
                        </p>
                    ) : (
                        displayRecipes.map(recipe => (
                            <RecipeCard
                                key={recipe.idMeal}
                                title={recipe.strMeal}
                                image={recipe.strMealThumb}
                                category={recipe.strCategory}
                                onClick={() => handleRecipeClick(recipe)}
                                toggleFavorite={() => toggleFavorite(recipe)}
                                isFavorite={favorites.some(fav => fav.idMeal === recipe.idMeal)}
                            />
                        ))
                    )
                }

            </div>

            {
                isOpen && (
                    <RecipeDetails
                        recipe={selectedRecipe}
                        onClose={() => setIsOpen(false)}
                        toggleFavorite={toggleFavorite}
                        isFavorite={favorites.some(fav => fav.idMeal === selectedRecipe.idMeal)}
                    />
                )
            }


        </>
    )
}

export default Home