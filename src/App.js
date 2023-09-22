import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
	const [alert, setAlert] = useState(null);

	const showAlert = (message, type) => {
		setAlert({
			message: message,
			type: type,
		});
		setTimeout(() => {
			setAlert(null);
		}, 2000);
	};

	return (
		<NoteState>
			<BrowserRouter>
				<Navbar />
				<Alert alert={alert} />
				<div className="container">
					<Routes>
						<Route
							path="/"
							element={<Home showAlert={showAlert} />}
						/>
						<Route path="/about" element={<About />} />
						<Route
							path="/login"
							element={<Login showAlert={showAlert} />}
						/>
						<Route
							path="/signup"
							element={<Signup showAlert={showAlert} />}
						/>
						<Route path="*" element={<h1>Page not found!</h1>} />
					</Routes>
				</div>
			</BrowserRouter>
		</NoteState>
	);
}

export default App;
