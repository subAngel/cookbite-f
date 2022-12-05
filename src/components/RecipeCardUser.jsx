import React from "react";
import { useRecipes } from "../context/RecipeProvides";
import { useNavigate } from "react-router-dom";

const API_URL = "https://cookbite-bk-qas.onrender.com";

function RecipeCardUser({ recipe }) {
	const { deleteRecipe } = useRecipes();
	const navigate = useNavigate();
	return (
		<div className="card card-normal w-54 bg-base-100 shadow-xl ">
			<figure className="w-54">
				{" "}
				<img
					className="w-min md:w-full"
					src={API_URL + recipe.path}
					alt={recipe.recipe_name}
				/>
			</figure>
			<h2 className="card-title pl-4 mt-1 text-ellipsis md:text-clip">
				{recipe.recipe_name}
			</h2>
			<p className="mb-4 p-4 text-ellipsis md:truncate">
				{recipe.description}
			</p>
			<div className="card-actions justify-end mb-4 mr-2">
				<button
					className="btn btn-ghost hover:bg-error border-none base-content "
					onClick={() => {
						deleteRecipe(recipe._id);
					}}
				>
					Borrar
				</button>

				<button
					className="btn btn-primary"
					onClick={() => {
						navigate(`edit/${recipe._id}`);
					}}
				>
					Actualizar
				</button>
			</div>
		</div>
	);
}

export default RecipeCardUser;
