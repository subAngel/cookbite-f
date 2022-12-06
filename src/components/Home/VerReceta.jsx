import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";

var node = document.getElementById("content");
var receta = document.getElementById("receta-body");

var nombreReceta = "";
var nombreAutor = "";

const URL_RECIPE = "https://cookbite-bk-qas.onrender.com";

function crearPDF() {
	var contenido = document.getElementById("receta");

	var opt = {
		margin: 1,
		filename: `Receta-${nombreReceta}-${nombreAutor}.pdf`,
		image: { type: "jpeg", quality: 0.98 },
		html2canvas: { scale: 3 },
		jsPDF: { unit: "in", format: "a3", orientation: "portrait" },
	};

	html2pdf()
		.set(opt)
		.from(contenido)
		.save()
		.catch((err) => console.log(err));
}

function VerReceta() {
	const params = useParams();
	const [recipe, setRecipe] = useState({});
	const [arrIng, setArrIng] = useState([]);
	const [arrPasos, setArrPasos] = useState([]);
	useEffect(() => {
		async function getRecipe() {
			const response = await axios.get(URL_RECIPE + "/recipe/" + params.id);
			console.log("Data", response.data);
			setRecipe(response.data);
			setArrIng(response.data.ingredients);
			setArrPasos(response.data.steps);
			nombreReceta = response.data.recipe_name;
			nombreAutor = response.data.fullname_user;
		}

		getRecipe();
		// cargarLista();
	}, []);

	const list_ingredientes = arrIng.map((ing, index) => (
		<li key={index} className="list-disc last:hidden">
			{ing.replace(/,/g, "").replace(",", "")}
		</li>
	));
	const list_pasos = arrPasos.map((paso, index) => (
		<li key={index} className="list-decimal last:hidden">
			{paso.replace(/,/g, "").replace(",", "")}
		</li>
	));

	return (
		<div className="overflow-y-hidden">
			<div className="navbar bg-secondary sticky top-0 z-[100] justify-around py-4">
				<button className="btn btn-ghost normal-case text-xl">
					<Link to="/">Inicio</Link>
				</button>
				<button
					className="btn btn-warning"
					onClick={() => {
						crearPDF();
					}}
				>
					Guardar Receta
				</button>
			</div>
			<div className="container mx-auto ">
				<div className="hero pt-12 h-full my-auto">
					<div className="hero-content flex-col lg:flex-row " id="receta">
						<img
							src={URL_RECIPE + recipe.path}
							className="max-w-sm rounded-lg shadow-2xl"
						/>
						<div id="receta-body">
							<h1 className="text-5xl font-bold">
								{recipe.recipe_name}
							</h1>
							<h3 className="mt-3 text-xl">
								Subido por:{" "}
								<span className="italic font-bold">
									{recipe.fullname_user}
								</span>
							</h3>
							<h4 className="mt-3 text-xl font-bold">Descripción</h4>
							<p className="mt-2">{recipe.description}</p>

							<div className="flex mt-4">
								<div className="grid h-10 w-30 place-items-center">
									<span className="font-bold">
										N° de Porciones:{" "}
									</span>
									<span>{recipe.servings}</span>
								</div>
								<div className="divider divider-horizontal"></div>
								<div className="grid h-10 place-items-center">
									<span className="font-bold">
										Tiempo de preparación:{" "}
									</span>
									<span>{recipe.cooking_time} min</span>
								</div>
							</div>

							<h4 className="mt-3 text-xl font-bold">Ingredientes</h4>
							<div>
								<ul className="pl-8">{list_ingredientes}</ul>
							</div>
							{/* <p className="mt-2">{recipe.ingredients}</p> */}

							<h4 className="mt-3 text-xl font-bold">
								Pasos de elaboración
							</h4>
							{/* <p className="mt-2">{recipe.steps}</p> */}
							<div>
								<ul className="pl-8">{list_pasos}</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <div id="content">
				<h1>Hello world</h1>
			</div> */}
		</div>
	);
}

export default VerReceta;
