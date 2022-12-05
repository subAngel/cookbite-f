import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import Cookies from "universal-cookie";

import "./form.css";
import { useRecipes } from "../../context/RecipeProvides";
const cookies = new Cookies();

function CrearReceta() {
	const username = cookies.get("username");
	const fullname = cookies.get("full_name");

	const { createRecipe } = useRecipes();
	// * FORM DATA
	const [recipe_name, setRecipe_name] = useState("");
	const [file, setFile] = useState(null);
	const [descripcion, setDescripcion] = useState("");
	const [porciones, setPorciones] = useState(0);
	const [tiempo, setTiempo] = useState(0);
	const [ingredientes, setIngredientes] = useState("");
	const [pasos, setPasos] = useState("");
	const [ing_cantidad, setIng_cantidad] = useState(0);
	const [ing_description, setIng_description] = useState("");
	const [input_pasos, setInput_pasos] = useState("");

	// banderas
	const [fileExist, setFileExist] = useState(false);
	const [btnAddIng, setBtnAddIng] = useState(false);
	const [btnAddPaso, setBtnAddPaso] = useState(false);
	const [allFields, setAllFields] = useState(false);

	const handleChange = (e) => {
		if (e.target.name === "recipe_name") {
			setRecipe_name(e.target.value);
		}
		if (e.target.name === "image") {
			setFile(e.target.files[0]);
			setFileExist(true);
		}
		if (e.target.name === "description") {
			setDescripcion(e.target.value);
		}
		if (e.target.name === "servings") {
			setPorciones(parseInt(e.target.value));
		}
		if (e.target.name === "cooking_time") {
			setTiempo(parseInt(e.target.value));
		}
		if (e.target.name === "ingredients") {
			setIngredientes(e.target.value);
		}
		if (e.target.name === "steps") {
			setPasos(e.target.value);
		}
		if (e.target.name === "ing_cantidad") {
			setIng_cantidad(e.target.value);
		}
		if (e.target.name === "ing_descripcion") {
			setIng_description(e.target.value);
		}
		if (e.target.name === "paso_descripcion") {
			setInput_pasos(e.target.value);
		}
		if (ing_cantidad !== "" && ing_description !== "") {
			setBtnAddIng(true);
		}
		if (input_pasos !== "") {
			setBtnAddPaso(true);
		}
		if (
			(recipe_name, descripcion, ingredientes, pasos) !== "" &&
			(porciones, tiempo) !== 0
		) {
			setAllFields(true);
		}
	};
	useEffect(() => {
		if (!cookies.get("username")) {
			window.location.href = "../login";
		}
		console.log("Bienvenido");
	}, []);

	const handleSubmit = () => {
		if (
			(recipe_name && descripcion && ingredientes && pasos) === "" ||
			!file ||
			(porciones && tiempo) === 0
		) {
			alert("Completa los campos");
			return;
		}
		const formData = new FormData();
		formData.append("recipe_name", recipe_name);
		formData.append("image", file);
		formData.append("description", descripcion);
		formData.append("fullname_user", fullname);
		formData.append("servings", porciones);
		formData.append("cooking_time", tiempo);
		formData.append("ingredients", ingredientes);
		formData.append("steps", pasos);
		createRecipe(username, formData);
		console.log("creando receta");
		// TODO
	};

	const handleIngrediente = (e) => {
		e.preventDefault();
		let aux = ing_cantidad + "  |  " + ing_description + "\n";
		setIngredientes(ingredientes + aux);
		setBtnAddIng(false);
		setIng_cantidad("");
		setIng_description("");
	};

	const handlePaso = (e) => {
		e.preventDefault();
		let aux2 = input_pasos + "\n";
		console.log(input_pasos);
		setPasos(pasos + aux2);
		setInput_pasos("");
		setBtnAddPaso(false);
	};

	return (
		<>
			<div className="navbar bg-primary px-4 ">
				<div className="navbar-start">
					<button className="btn btn-ghost text-3xl my-3 ">
						<Link to="/mis-recetas">Mis Recetas</Link>
					</button>
				</div>
				<div className="navbar-center text-2xl font-bold">Crear Receta</div>
			</div>

			<div className="contenedor drop-shadow-xl ">
				<form className="formulario">
					<div className="w-full">
						<input
							onChange={handleChange}
							className="input input-lg w-full text-3xl"
							id="receta"
							name="recipe_name"
							autoComplete="off"
							type="text"
							placeholder="Título: Chilaquiles Rojos"
						/>
					</div>
					<div className="w-full">
						<input
							// handleChange={}
							onChange={handleChange}
							type="file"
							id="image"
							name="image"
							className="file-input file-input-bordered file-input-secondary w-full "
							// value={file}
						/>
					</div>
					<div className="w-full">
						{/* <label htmlFor="desc">Descripcion de la receta</label> */}
						<textarea
							onChange={handleChange}
							id="desc"
							name="description"
							placeholder="Descripción de la receta"
							className="textarea w-full text-md"
						/>
					</div>

					<div>
						<label htmlFor="fullname" className="input-group hidden">
							<span className="label-text">
								Nombre completo de usuario
							</span>
							<input
								type="text"
								id="fullname"
								className="input w-full"
								name="fullname_user"
								defaultValue={fullname}
								placeholder="Ricardo Lopez"
							/>
						</label>
					</div>
					<div className="flex flex-col w-full lg:flex-row ">
						<label htmlFor="porciones" className="input-group ">
							<span className="label-text">No° de Porciones</span>
							<input
								onChange={handleChange}
								type="number"
								id="porciones"
								className="input"
								name="servings"
								placeholder="4"
							/>
						</label>
						<label htmlFor="time" className="input-group">
							<span className="label-text">Tiempo de cocción</span>
							<input
								onChange={handleChange}
								type="number"
								id="time"
								className="input"
								name="cooking_time"
								placeholder="Tiempo en minutos"
							/>
						</label>
					</div>
					<div className="w-full flex">
						<div className="w-auto md:w-full flex justify-around">
							<div className="my-auto mr-2">
								<input
									onChange={handleChange}
									value={ing_cantidad}
									type="number"
									name="ing_cantidad"
									placeholder="8"
									className="input w-28"
								/>
							</div>
							<div className="my-auto mr-2">
								<input
									onChange={handleChange}
									value={ing_description}
									type="text"
									name="ing_descripcion"
									placeholder="Tazas de agua"
									className="input w-56"
									autoComplete="off"
								/>
							</div>
							<button
								className={
									btnAddIng
										? "btn btn-square my-auto"
										: "btn btn-square my-auto btn-disabled"
								}
								onClick={handleIngrediente}
							>
								<AiOutlinePlus className="text-xl " />
							</button>
						</div>
						<label
							htmlFor="ingredientes"
							className="input-group input-group-vertical text-lg  w-full"
						>
							<span className="py-2">Ingredientes</span>
							<textarea
								onChange={handleChange}
								value={ingredientes}
								id="ingredientes"
								type="text"
								name="ingredients"
								placeholder="Ingredientes"
								className="textarea h-40"
							/>
						</label>
					</div>
					<div className="w-full flex">
						<div className="w-auto md:w-full flex justify-around">
							<div className="w-3/4 my-auto mr-2 justify-items-center">
								<input
									onChange={handleChange}
									value={input_pasos}
									type="text"
									name="paso_descripcion"
									className="input w-full"
									placeholder="Agregar en un tazón la harina..."
									autoComplete="off"
								/>
							</div>

							<div className="w-1/4 my-auto">
								<button
									className={
										btnAddPaso
											? "btn btn-square"
											: "btn btn-square btn-disabled"
									}
									onClick={handlePaso}
								>
									<AiOutlinePlus className="text-xl " />
								</button>
							</div>
						</div>
						<label
							htmlFor="pasos"
							className="input-group input-group-vertical text-lg "
						>
							<span className="py-2">Pasos</span>
							<textarea
								onChange={handleChange}
								value={pasos}
								type="text"
								id="pasos"
								name="steps"
								placeholder="Pasos"
								className="textarea h-40"
							/>
						</label>
					</div>

					<button
						className={
							allFields
								? "btn btn-primary w-full"
								: "btn btn-primary w-full btn-disabled"
						}
						type="button"
						onClick={handleSubmit}
					>
						Crear Receta
					</button>
				</form>
			</div>
		</>
	);
}

export default CrearReceta;
