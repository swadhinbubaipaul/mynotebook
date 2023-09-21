import React from "react";

const Signup = () => {
	return (
		<form>
			<div className="mb-3">
				<label htmlFor="email" className="form-label">
					Email
				</label>
				<input type="email" className="form-control" id="email" />
			</div>
			<div className="mb-3">
				<label htmlFor="password" className="form-label">
					Password
				</label>
				<input type="password" className="form-control" id="password" />
			</div>
			<button type="submit" className="btn btn-primary">
				Signup
			</button>
		</form>
	);
};

export default Signup;
