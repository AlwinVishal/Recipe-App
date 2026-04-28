import React from 'react'

import { StarIcon as SolidStar } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStar } from "@heroicons/react/24/outline";

function RecipeCard({
    title,
    image,
    category,
    onClick,
    toggleFavorite,
    isFavorite
}) {

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-xl shadow-md overflow-hidden 
            hover:shadow-xl hover:scale-[1.02] transition duration-300 cursor-pointer"
        >
            <div className="relative">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-44 object-cover"
                />

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite();
                    }}
                    className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow 
                    hover:scale-110 transition"
                >
                    {
                        isFavorite ? (
                            <SolidStar className="w-5 h-5 text-yellow-400" />
                        ) : (
                            <OutlineStar className="w-5 h-5 text-gray-400" />
                        )
                    }
                </button>
            </div>

            <div className="p-3">
                <h2 className="font-semibold text-gray-800 text-sm truncate">
                    {title}
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                    {category}
                </p>
            </div>
        </div>
    )
}

export default RecipeCard