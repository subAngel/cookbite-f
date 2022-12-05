import axios from "axios";

const API_URL = "https://cookbite-bk-qas.onrender.com/your-recipes/";
const HOST_NAME = "https://cookbite-bk-qas.onrender.com/";
export const getRecipesRequest = async (user) => {
	return await axios.get(API_URL + user);
};

export const getAllRecipesRequest = async () => {
	return await axios.get(HOST_NAME + "all-recipes");
};

export const getRecipeByName = async (palabra) => {
	return await axios.get(HOST_NAME + "search-recipes/" + palabra);
};

export const getRecipeRequest = async (id) => {
	return await axios.get(HOST_NAME + "recipe/" + id);
};

export const updateRecipeRequest = async (id, fields) => {
	await axios.put(HOST_NAME + "your-recipes/" + id, fields);
};
