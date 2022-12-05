import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineClear } from "react-icons/ai";
import { getAllRecipesRequest, getRecipeByName } from "../../api/api.js";
import "../../pages/MisRecetas/particles.scss";

const API_URL = "https://cookbite-bk-qas.onrender.com";
function SecondarySection() {
	const navigate = useNavigate();
	const [word, setWord] = useState("");

	const [recipes, setRecipes] = useState([]);
	useEffect(() => {
		async function loadRecipes() {
			const response = await getAllRecipesRequest();
			setRecipes(response.data);
		}

		loadRecipes();
	}, []);
	async function eliminarBusqueda() {
		setWord("");
		const response = await getAllRecipesRequest();
		setRecipes(response.data);
	}

	async function searchRecipes(palabra) {
		const response = await getRecipeByName(palabra);
		console.log(response.data);
		setRecipes(response.data);
	}

	const handleChange = (event) => {
		setWord(event.target.value);
	};

	return (
		<div className="p-20 container mx-auto px-4 w-9/12">
			<div className="container mx-auto  m-5 relative">
				<div className="flex items-center justify-center sticky top-0">
					<div
						className="tooltip tooltip-secondary "
						data-tip="Limpiar búsqueda"
					>
						<button
							onClick={() => {
								console.log("Limpiar búsqueda");
								eliminarBusqueda();
							}}
							className="p-2.5 mr-2 text-sm font-medium text-white rounded-lg border btn btn-secondary "
						>
							<AiOutlineClear className="text-slate-600 text-2xl font-bold " />
						</button>
					</div>
					<label htmlFor="simple-search" className="sr-only">
						Busca una receta
					</label>

					<div className="relative ">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<AiOutlineSearch />
						</div>
						<input
							type="text"
							value={word}
							onChange={handleChange}
							id="simple-search"
							className=" input text-base rounded-lg  block w-full pl-10 p-2.5 max-w-xs "
							placeholder="Busca una receta"
							name="search"
							autoComplete="off"
						/>
					</div>
					<div
						className="tooltip tooltip-info "
						data-tip="Iniciar búsqueda"
					>
						<button
							onClick={() => {
								searchRecipes(word);
							}}
							className="p-2.5 ml-2 text-sm font-medium text-white rounded-lg border btn btn-info"
						>
							<AiOutlineSearch className="text-slate-600 text-2xl font-bold" />

							<span className="sr-only">Busca una receta</span>
						</button>
					</div>
				</div>
			</div>
			{recipes.length <= 0 ? (
				<div className="flex justify-center h-28">
					<h1 className="mt-34 mb-2 text-2xl font-extrabold  text-center">
						No se encontraron coincidencias con la palabra: {word}
					</h1>
				</div>
			) : (
				<div className="grid md:grid-cols-4 gap-8 mx-auto ">
					{recipes.map((recipe) => (
						<div
							className="card card-compact w-60 bg-base-100 shadow-xl mx-auto"
							key={recipe._id}
						>
							<figure>
								<img
									src={API_URL + recipe.path}
									alt={recipe.recipe_name}
								/>
							</figure>
							<div className="card-body">
								<h2 className="card-title">{recipe.recipe_name}</h2>
								<div className="my-2 h-6">
									<p className="truncate">{recipe.description}</p>
								</div>
								<p>
									Subido por:{" "}
									<span className="italic font-bold">
										{recipe.fullname_user}
									</span>
								</p>
								<div className="card-actions justify-end">
									<button
										className="btn btn-primary btn-sm"
										onClick={() => {
											navigate(`/receta/${recipe._id}`);
										}}
									>
										Ver receta
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default SecondarySection;
