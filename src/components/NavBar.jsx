import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImExit } from "react-icons/im";
import { GiChefToque } from "react-icons/gi";

function NavBar({ darclick, fullname }) {
	return (
		<nav className="w-full justify-center px-4 bg-primary">
			<div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
				<div>
					<div className="flex items-center justify-between py-3 md:py-5 md:block">
						<h2 className="btn btn-ghost normal-case text-xl">
							<Link to="/">Inicio</Link>
						</h2>
					</div>
				</div>
				<div>
					<div
						className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 block `}
					>
						<ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
							<li>
								<h2 className="text-xl mr-44">{fullname}</h2>
							</li>
							<li>
								<button className=" btn btn-active btn-secondary text-lg ">
									<Link
										to="/mis-recetas/nueva-receta"
										className="bg-active"
									>
										Crear nueva receta
									</Link>
								</button>
							</li>
						</ul>
					</div>
				</div>
				<div className="hidden space-x-2 md:inline-block">
					<div
						className="tooltip tooltip-warning tooltip-bottom"
						data-tip="Cerrar sesión"
					>
						<button
							onClick={() => darclick()}
							className="btn btn-neutral"
						>
							<ImExit />
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default NavBar;
