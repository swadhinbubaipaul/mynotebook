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

function App() {
	return (
		<NoteState>
			<BrowserRouter>
				<Navbar />
				<Alert message="This is amazing react course" />
				<div className="container">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="*" element={<h1>Page not found!</h1>} />
					</Routes>
				</div>
			</BrowserRouter>
		</NoteState>
	);
}

export default App;
