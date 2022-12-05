import { Component, useState } from "react";
import { signupFields } from "../constants/formFields";
import FormAction from "./FormAction";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Input from "./Input";
import axios from "axios";
import { Link } from "react-router-dom";

const createUserURL = "https://cookbite-bk-qas.onrender.com/create-user";

function Singup() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [full_name, setFull_name] = useState("");
	const [email, setEmail] = useState("");
	const [hasError, setHasError] = useState(false);

	const notifyError = (text) =>
		toast.error(text, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
		});

	const crearUsuario = async () => {
		await axios
			.post(`${createUserURL}/${full_name}/${username}/${email}/${password}`)
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
				alert(err);
			});
	};

	function handleChange(name, value) {
		if (name == "username") {
			let regex = new RegExp("^[a-zA-Z0-9]+$");
			if (regex.test(value)) {
				console.log(name, value);
				setHasError(false);
				setUsername(value);
			} else {
				console.log("El nombre de usuario no debe tener espacios");
				notifyError(
					"El nombre de usuario no debe tener espacios ni simbolos raros"
				);
				setHasError(true);
			}
		}
		if (name == "password") {
			let regex = new RegExp("^[a-zA-Z0-9]+$");
			if (regex.test(value)) {
				console.log(name, value);
				setPassword(value);
				setHasError(false);
			} else {
				console.log("La contraseña no admite espacios");
				setHasError(true);
				notifyError("La contraseña no admite espacios");
			}
		}
		if (name === "email") {
			console.log(name, value);
			setEmail(value);
			setHasError(false);
		}
		if (name === "full_name") {
			let regex = new RegExp("^[a-zA-Z ]+$");
			if (regex.test(value)) {
				console.log(name, value);
				setHasError(false);
				setFull_name(value);
			} else {
				setHasError(true);
				notifyError("El nombre completo del usuario no debe tener numeros");
			}
		}
	}

	return (
		<form className="mt-8 space-y-11 form-control">
			<div className="px-4 mx-auto w-80 ">
				<Input
					handleChange={handleChange}
					className="input input-bordered w-full my-2 "
					atributo={{
						id: "full_name",
						name: "full_name",
						placeholder: "Nombre completo",
						type: "text",
					}}
					value={full_name}
					param={hasError}
				/>
				<Input
					handleChange={handleChange}
					atributo={{
						id: "username",
						name: "username",
						placeholder: "Nombre de usuario",
						type: "text",
					}}
					value={username}
					param={hasError}
				/>
				<Input
					atributo={{
						id: "email",
						name: "email",
						placeholder: "Correo electronico",
						type: "email",
					}}
					handleChange={handleChange}
					value={email}
				/>
				<Input
					handleChange={handleChange}
					atributo={{
						id: "password",
						name: "password",
						type: "password",
						placeholder: "Contraseña",
					}}
					value={password}
					param={hasError}
				/>
				<button
					className="group relative w-full flex justify-center py-4 px-4 border border-transparent btn btn-primary"
					onClick={() => {
						crearUsuario();

						window.location.href = "./login";
					}}
					disabled={hasError}
				>
					<Link to="/login">Registrarse</Link>
				</button>
			</div>
			<ToastContainer />
		</form>
	);
}

export default Singup;
