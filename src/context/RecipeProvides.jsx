import { useContext, useState } from "react";

import { RecipeContext } from "./RecipeContext";
import {
	getRecipesRequest,
	getRecipeByName,
	getRecipeRequest,
	updateRecipeRequest,
} from "../api/api.js";

export const useRecipes = () => {
	const context = useContext(RecipeContext);
	if (!context) {
		throw new Error("UseRecipes must be used within a recipeContextProvider");
	}
	return context;
};

export const RecipesContextProvider = ({ children }) => {
	const [recipes, setRecipes] = useState([]);

	async function loadRecipes(username) {
		const response = await getRecipesRequest(username);
		// console.log(response.data);
		setRecipes(response.data);
	}

	async function getRecipesByName(palabra) {
		const response = await getRecipeByName(palabra);
		// console.log(response.data);
		setRecipes(response.data);
	}

	const createRecipe = async (username, formData) => {
		fetch(`https://cookbite-bk-qas.onrender.com/your-recipes/${username}`, {
			method: "POST",
			body: formData,
		})
			.then((res) => res.text())
			.then((res) => {
				console.log(res);
				window.location.href = "../mis-recetas";
			})
			.catch((err) => console.error(err));
	};
	const deleteRecipe = async (id) => {
		fetch(`https://cookbite-bk-qas.onrender.com/your-recipes/${id}`, { method: "DELETE" })
			.then((res) => res.json())
			.then((res) => {
				setRecipes(recipes.filter((recipe) => recipe._id !== id));
				console.log(res);
			})
			.catch((err) => console.error(err));
	};

	const getRecipe = async (id) => {
		try {
			const response = await getRecipeRequest(id);
			return response.data;
		} catch (error) {
			console.log("error al consultar la receta");
		}
	};

	const updateRecipe = async (id, newFields) => {
		try {
			const response = await updateRecipeRequest(id, newFields);
			console.log(response);
		} catch (error) {
			console.log("Error al actualizar");
		}
	};

	return (
		<RecipeContext.Provider
			value={{
				recipes,
				loadRecipes,
				createRecipe,
				deleteRecipe,
				getRecipesByName,
				getRecipe,
				updateRecipe,
			}}
		>
			{children}
		</RecipeContext.Provider>
	);
};
