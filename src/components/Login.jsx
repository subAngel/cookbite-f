import { Component } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import md5 from "md5";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { loginFields } from "../constants/formFields";
import Input from "./Input";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const baseUrl = "https://cookbite-bk-qas.onrender.com/users";
const cookies = new Cookies();

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [full_name, setFullName] = useState("");
	const [userInputError, setUserInputError] = useState(false);
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

	function handleChange(name, value) {
		if (name == "username") {
			let regex = new RegExp("^[a-zA-Z0-9]+$");
			if (regex.test(value)) {
				console.log(name, value);
				setUsername(value);
			} else {
				console.log("El nombre de usuario no debe tener espacios");
				notifyError("El nombre de usuario no debe tener espacios");
			}
		}
		if (name == "password") {
			let regex = new RegExp("^[a-zA-Z0-9]+$");
			if (regex.test(value)) {
				console.log(name, value);
				setPassword(value);
			} else {
				console.log("La contraseña no admite espacios");
				notifyError("La contraseña no admite espacios");
			}
		}
		if (name === "email") {
			console.log(name, value);
			setEmail(value);
		}
		if (name === "full_name") {
			let regex = new RegExp("^[a-zA-Z ]+$");
			if (regex.test(value)) {
				console.log(name, value);
				setFullName(value);
			} else {
				notifyError("El nombre completo del usuario no debe tener numeros");
			}
		}
	}

	return (
		<>
			<form className="mt-8 space-y-6">
				<div className="-space-y-px">
					<div>
						<Input
							atributo={{
								id: "username",
								name: "username",
								placeholder: "Ingrese su nombre de usuario",
								type: "text",
							}}
							value={username}
							handleChange={handleChange}
						/>
					</div>
					<div>
						<Input
							atributo={{
								id: "full_name",
								name: "full_name",
								placeholder: "Ingrese su nombre completo",
								type: "text",
							}}
							handleChange={handleChange}
						/>
					</div>
					<div>
						<Input
							atributo={{
								id: "email",
								name: "email",
								placeholder: "Ingrese su correo electronico",
								type: "email",
							}}
							handleChange={handleChange}
						/>
					</div>
					<div>
						<Input
							atributo={{
								id: "password",
								name: "password",
								placeholder: "Ingrese su contrasena",
								type: "password",
							}}
							value={password}
							handleChange={handleChange}
						/>
					</div>
				</div>
				<button
					className="group relative w-full flex justify-center py-2 px-4 border border-transparent btn btn-primary"
					// onClick={toast}
				>
					Iniciar Sesión
				</button>
			</form>

			<ToastContainer />
		</>
	);
}
export default Login;
