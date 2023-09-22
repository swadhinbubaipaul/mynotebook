import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		console.log("Logout");
		navigate("/login");
	};
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					MyNotebook
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<NavLink
								className="nav-link"
								aria-current="page"
								to="/"
							>
								Home
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/about">
								About
							</NavLink>
						</li>
					</ul>
					{!localStorage.getItem("token") ? (
						<div className="d-flex">
							<Link className="btn btn-primary me-2" to="/login">
								Login
							</Link>
							<Link className="btn btn-primary" to="/signup">
								Signup
							</Link>
						</div>
					) : (
						<button
							className="btn btn-primary"
							onClick={handleLogout}
						>
							Logout
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
