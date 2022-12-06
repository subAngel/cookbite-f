import axios from "axios";
import md5 from "md5";
import { Component } from "react";
import Cookies from "universal-cookie";

const peticionUrl = "https://cookbite-bk-qas.onrender.com/user/";
const cookies = new Cookies();

class Sesion extends Component {
	state = {
		form: {
			username: "",
			password: "",
		},
	};

	iniciarSesion = async (e) => {
		e.preventDefault();
		await axios
			.get(peticionUrl + this.state.form.username)
			.then((response) => {
				console.log(response);
				return response.data;
			})
			.then((response) => {
				if (response) {
					console.log("Respuesta SESION", response);
					if (md5(this.state.form.password) !== response.password) {
						alert("Error en la contraseña");
					} else {
						cookies.set("_id", response._id, { path: "/" });
						cookies.set("username", response.username, { path: "/" });
						cookies.set("full_name", response.full_name, { path: "/" });
						cookies.set("email", response.email, { path: "/" });
						alert("Bienvenido!");
						window.location.href = "../mis-recetas";
					}
				} else {
					alert("el usuario y contraseña son incorrectos");
				}
			})
			.catch((err) => {
				console.log("EL usuario no existe");
			});
	};

	handleChange = async (e) => {
		await this.setState({
			form: {
				...this.state.form,
				[e.target.name]: e.target.value,
			},
		});
		// console.log(this.state.form);
	};

	componentDidMount() {
		if (cookies.get("username")) {
			window.location.href = "./mis-recetas";
		}
	}

	render() {
		return (
			<form className="mt-8 space-y-6">
				<div className="-space-y-px">
					<div>
						<input
							onChange={this.handleChange}
							id="username"
							name="username"
							type="text"
							autoComplete="off"
							className="input input-bordered w-full"
							placeholder="Nombre de usuario"
						/>
					</div>
					<div>
						<input
							onChange={this.handleChange}
							id="password"
							name="password"
							type="password"
							autoComplete="off"
							className="input input-bordered w-full mt-8"
							placeholder="Contraseña"
						/>
					</div>
				</div>
				<button
					className="group relative w-full flex justify-center py-2 px-4 border border-transparent btn btn-primary"
					onClick={this.iniciarSesion}
				>
					Iniciar Sesión
				</button>
			</form>
		);
	}
}

export default Sesion;
