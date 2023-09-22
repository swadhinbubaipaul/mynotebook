import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ showAlert }) => {
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const requestOptions = {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(credentials),
			};

			const response = await fetch(
				"http://localhost:5000/api/auth/login",
				requestOptions
			);
			const jsonResponse = await response.json();
			console.log(jsonResponse);
			if (jsonResponse.success) {
				// Save the auth token and redirect
				localStorage.setItem("token", jsonResponse.authToken);
				navigate("/");
				showAlert("Logged in Successfully", "success");
			} else {
				showAlert("Invalid Credentials", "danger");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="mb-3 mt-3">
				<label htmlFor="email" className="form-label">
					Email
				</label>
				<input
					type="email"
					className="form-control"
					id="email"
					name="email"
					onChange={handleChange}
					required
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="password" className="form-label">
					Password
				</label>
				<input
					type="password"
					className="form-control"
					id="password"
					name="password"
					onChange={handleChange}
					required
				/>
			</div>
			<button type="submit" className="btn btn-primary">
				Login
			</button>
		</form>
	);
};

export default Login;
