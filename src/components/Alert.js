import React from "react";

const Alert = ({ alert }) => {
	const type = alert?.type === "danger" ? "error" : alert?.type;
	return (
		<div style={{ height: "50px" }}>
			{alert && (
				<div
					className={`alert alert-${alert.type} alert-dismissible fade show`}
					role="alert"
				>
					<strong>
						{type.charAt(0).toUpperCase() + type.slice(1)}
					</strong>
					: {alert.message}
				</div>
			)}
		</div>
	);
};

export default Alert;
