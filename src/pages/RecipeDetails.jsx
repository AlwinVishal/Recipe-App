import React from 'react'
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon as SolidStar } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStar } from "@heroicons/react/24/outline";

function RecipeDetails({ recipe, onClose, toggleFavorite, isFavorite }) {

    if (!recipe) return null;

    const ingredients = [];

    Object.keys(recipe).forEach((key) => {
        if (key.startsWith("strIngredient")) {
            const ingredient = recipe[key];
            const index = key.replace("strIngredient", "");
            const measure = recipe[`strMeasure${index}`];

            if (ingredient && ingredient.trim() !== "") {
                ingredients.push(`${ingredient} - ${measure}`);
            }
        }
    });

    const youtubeUrl = recipe.strYoutube;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 px-4"        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto relative shadow-xl"
            >

                <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">
                        {recipe.strMeal}
                    </h2>

                    <div className="flex items-center gap-3">

                        <button
                            onClick={() => toggleFavorite(recipe)}
                            className="p-1 rounded-full hover:scale-110 transition"
                        >
                            {
                                isFavorite ? (
                                    <SolidStar className="w-6 h-6 text-yellow-400" />
                                ) : (
                                    <OutlineStar className="w-6 h-6 text-gray-400" />
                                )
                            }
                        </button>

                        <button
                            onClick={onClose}
                            className="p-1 rounded-full hover:bg-gray-100 transition"
                        >
                            <XMarkIcon className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </div>

                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full h-56 object-cover"
                />

                <div className="p-4">

                    <p className="text-sm text-gray-500 mb-2">
                        Category: {recipe.strCategory}
                    </p>

                    <h3 className="font-semibold text-gray-800 mb-2">
                        Ingredients
                    </h3>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-gray-700 mb-4">
                        {ingredients.map((item, index) => (
                            <li key={index}>
                                • {item}
                            </li>
                        ))}
                    </ul>

                    <h3 className="font-semibold text-gray-800 mb-2">
                        Instructions
                    </h3>

                    <p className="text-sm text-gray-700 whitespace-pre-line">
                        {recipe.strInstructions}
                    </p>

                    {youtubeUrl && (
                        <div className="mt-5">
                            <h3 className="font-semibold text-gray-800 mb-2">
                                Video
                            </h3>

                            <a
                                href={youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                Watch on YouTube
                            </a>
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}

export default RecipeDetails;