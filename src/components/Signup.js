import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ showAlert }) => {
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (credentials.password !== credentials.confirmPassword) {
			showAlert("Password Missmatch", "danger");
		} else {
			try {
				const requestOptions = {
					method: "post",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: credentials.name,
						email: credentials.email,
						password: credentials.password,
					}),
				};

				const response = await fetch(
					"http://localhost:5000/api/auth/createuser",
					requestOptions
				);
				const jsonResponse = await response.json();
				console.log(jsonResponse);
				if (jsonResponse.success) {
					// Save the auth token and redirect
					localStorage.setItem("token", jsonResponse.authToken);
					navigate("/");
					showAlert("Account Created Successfully", "success");
				} else {
					showAlert(jsonResponse.error, "danger");
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};
	return (
		<form onSubmit={handleSubmit}>
			<div className="mb-3 mt-3">
				<label htmlFor="name" className="form-label">
					Name
				</label>
				<input
					type="text"
					className="form-control"
					id="name"
					name="name"
					onChange={handleChange}
					minLength={3}
					required
				/>
			</div>
			<div className="mb-3">
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
					minLength={5}
					required
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="confirmPassword" className="form-label">
					Confirm Password
				</label>
				<input
					type="password"
					className="form-control"
					id="confirmPassword"
					name="confirmPassword"
					onChange={handleChange}
					minLength={5}
					required
				/>
			</div>
			<button type="submit" className="btn btn-primary">
				Signup
			</button>
		</form>
	);
};

export default Signup;
