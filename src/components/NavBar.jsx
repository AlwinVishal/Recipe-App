import React from 'react'

import { StarIcon as SolidStar } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStar } from "@heroicons/react/24/outline";

function NavBar({
    setSearchTerm,
    setCategory,
    categories,
    setIngredient,
    ingredients,
    category,
    ingredient,
    showFavorites,
    setShowFavorites,
    favorites
}) {

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 shadow-md bg-white">
            <h1 className="text-2xl font-bold text-gray-800">
                Recipe App
            </h1>

            <div className="flex flex-wrap gap-3 items-center">

                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                        Recipe:
                    </span>

                    <input
                        type="text"
                        placeholder="Search recipes...."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-60
                            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Category:</span>

                    <select
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setIngredient("");
                        }}
                        className="border border-gray-300 rounded-lg px-3 py-2 bg-white
                            focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    >
                        <option value="">All Categories</option>
                        {
                            categories.map(ctgy => (
                                <option
                                    key={ctgy.idCategory}
                                    value={ctgy.strCategory}
                                >
                                    {ctgy.strCategory}
                                </option>
                            ))
                        }

                    </select>

                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                        Ingredient:
                    </span>

                    <select
                        value={ingredient}
                        onChange={(e) => {
                            setIngredient(e.target.value);
                            setCategory("");
                        }}
                        className="border border-gray-300 rounded-lg px-3 py-2 bg-white
                            focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    >
                        <option value="">All Ingredients</option>

                        {
                            ingredients.map((ing, index) => (
                                <option
                                    key={ing}
                                    value={ing}
                                >
                                    {ing}
                                </option>
                            ))
                        }
                    </select>

                </div>

                <button
                    onClick={() => setShowFavorites(!showFavorites)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition
                        ${showFavorites
                            ? "bg-yellow-400 text-white border-yellow-400 shadow"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                >
                    {showFavorites ? (
                        <SolidStar className="w-5 h-5" />
                    ) : (
                        <OutlineStar className="w-5 h-5" />
                    )}

                    <span>
                        {showFavorites ? "Showing Favorites" : `Favorites (${favorites.length})`}
                    </span>
                </button>

            </div>

        </div>
    )
}

export default NavBar