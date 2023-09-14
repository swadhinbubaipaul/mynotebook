import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter } from "react-router-dom";
import NoteState from "./context/notes/NoteState";

function App() {
	return (
		<NoteState>
			<BrowserRouter>
				<Navbar />
				<div className="container">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="*" element={<h1>Page not found!</h1>} />
					</Routes>
				</div>
			</BrowserRouter>
		</NoteState>
	);
}

export default App;
