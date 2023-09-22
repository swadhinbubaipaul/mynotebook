import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
	const host = "http://localhost:5000";
	const [notes, setNotes] = useState([]);

	// Get All Notes
	const getNotes = async () => {
		// API call
		const response = await apiCall(
			`${host}/api/notes/fetchallnotes`,
			"GET",
			localStorage.getItem("token")
		);
		console.log(response);
		if (response.success === true) {
			setNotes(response.notes);
		}
	};

	// Add a Note
	const addNote = async (title, description, tag) => {
		// API call
		const response = await apiCall(
			`${host}/api/notes/addnote`,
			"POST",
			localStorage.getItem("token"),
			{
				title,
				description,
				tag: tag.length === 0 ? undefined : tag,
			}
		);
		console.log(response);
		const note = response.note;
		if (response.success === true) {
			setNotes(notes.concat(note));
		}
	};

	// Delete a Note
	const deleteNote = async (id) => {
		//API call
		const response = await apiCall(
			`${host}/api/notes/deletenote/${id}`,
			"DELETE",
			localStorage.getItem("token")
		);
		console.log(response);
		if (response.success === true) {
			setNotes(
				notes.filter((note) => {
					return note._id !== id;
				})
			);
		}
	};

	// Edit a Note
	const editNote = async (id, title, description, tag) => {
		// API Call
		const response = await apiCall(
			`${host}/api/notes/updatenote/${id}`,
			"PUT",
			localStorage.getItem("token"),
			{
				title,
				description,
				tag,
			}
		);
		console.log(response);
		if (response.success === true) {
			// Logic to edit in client
			const newNotes = notes.map((note) => {
				if (note._id === id) {
					return response.note;
				} else {
					return note;
				}
			});
			console.log(newNotes);
			setNotes(newNotes);
		}
	};

	return (
		<NoteContext.Provider
			value={{ notes, getNotes, addNote, deleteNote, editNote }}
		>
			{props.children}
		</NoteContext.Provider>
	);
};

async function apiCall(url, method, authToken, data) {
	const response = await fetch(url, {
		method: method,
		headers: {
			"Content-Type": "application/json",
			"auth-token": authToken,
		},
		body: JSON.stringify(data),
	});
	return response.json();
}

export default NoteState;
