import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import Nomatch from "./pages/404/Nomatch";
import SignUpPage from "./pages/SignUp";
import User from "./pages/MisRecetas/User";
import CrearReceta from "./pages/MisRecetas/CrearReceta";
import EditarReceta from "./pages/MisRecetas/EditarReceta.jsx";
import { RecipesContextProvider } from "./context/RecipeProvides";
import VerReceta from "./components/Home/VerReceta";

function App() {
	return (
		<RecipesContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/cookbite-f/" element={<Home />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/login" element={<LoginPage />} />

					{/* <Route path="/sesion" element={ <Sesion/>} /> */}
					<Route path="/receta/:id" element={<VerReceta />} />
					<Route path="/mis-recetas" element={<User />} />
					{/* <Route path="/mis-recetas/nueva-receta" element={<FormReceta />} /> */}
					<Route
						path="/mis-recetas/nueva-receta"
						element={<CrearReceta />}
					/>
					<Route path="/mis-recetas/edit/:id" element={<EditarReceta />} />
					<Route path="*" element={<Nomatch />}></Route>
				</Routes>
			</BrowserRouter>
		</RecipesContextProvider>
	);
}

export default App;
