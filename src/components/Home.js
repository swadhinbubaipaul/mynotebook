import { useNavigate } from "react-router-dom";
import Notes from "./Notes";
import { useEffect } from "react";
const Home = ({ showAlert }) => {
	const navigate = useNavigate();

	useEffect(() => {
		// Check if "token" is not found in localStorage and redirect to /login if necessary
		if (!localStorage.getItem("token")) {
			navigate("/login");
		}
	}, [navigate]);

	return <Notes showAlert={showAlert} />;
};

export default Home;
