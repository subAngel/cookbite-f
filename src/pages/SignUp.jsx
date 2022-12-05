import Header from "../components/Header";
import Login from "../components/Login";
import Singup from "../components/Singup";

export default function SignUpPage() {
	return (
		<>
			<div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-base-300">
				<div className="max-w-md w-full space-y-8">
					<Header
						heading={"¡Bienvenido!, Crea una cuenta"}
						paragraph={"¿Ya tienes una cuenta?"}
						linkName={"Inicia sesión aquí"}
						linkUrl={"/login"}
					/>
					{/* * TODO Agregar esto */}
					<Singup />
					{/* <Login /> */}
				</div>
			</div>
		</>
	);
}
