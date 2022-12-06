import { Link } from "react-router-dom";
import "../../pages/MisRecetas/particles.scss";

const PrincipalSection = () => {
	return (
		<div className="hero h-screen relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0  bg-secondary">
			<div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0 fill-secondary">
				<svg
					className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block bg-base fill-base"
					viewBox="0 0 100 100"
					fill=""
					preserveAspectRatio="none slice"
				>
					<path d="M50 0H100L50 100H0L50 0Z" className="bg-base" />
				</svg>
				<img
					className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
					src="https://www.reviewbox.com.mx/wp-content/uploads/2020/01/Recetario-de-comida-saludable-4.jpg"
					alt=""
				/>
			</div>
			<div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
				<div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
					<img
						src="https://i.pinimg.com/originals/95/f3/4e/95f34e9bc588226a8c91a1be5bbebd67.png"
						alt="Imagen del recetario"
						className="h-44 w-44 m-auto"
					/>
					<div>
						<h1 className="mb-5 font-sans text-5xl font-bold tracking-tight sm:text-4xl sm:leading-none">
							<span className="">¡Bienvenido a </span>
							<span className="text-pink-600 font-bold">CookBite</span>
							!
						</h1>
					</div>

					<h2 className="mb-5 font-sans text-5xl font-bold tracking-tight sm:text-3xl sm:leading-none">
						Tu recetario en línea
					</h2>

					<p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
						Un lugar en el que puedes subir tus recetas para que las
						demás personas las puedan ver.
					</p>
					<p>
						Inicia sesión si ya tienes una cuenta o puedes registrarte a
						continuación para que puedas crear una receta.
					</p>
					<div className="flex items-center mt-6">
						<button className="btn ">
							<Link to="/login">Crea una receta</Link>
						</button>
						<button className="btn bg-green-400 hover:bg-green-500 border-none ml-20">
							<Link to="/signup">Registrarse</Link>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PrincipalSection;
