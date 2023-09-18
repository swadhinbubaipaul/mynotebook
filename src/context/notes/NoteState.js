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
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlZGEwYzRiZmMyNGUzZWM2MzRjMjRmIn0sImlhdCI6MTY5MzMxMjQ4MH0.bCgl8uh616FAraQc_R3PQYiOaL2d6WnEz1a_cxE_8VA"
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
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlZGEwYzRiZmMyNGUzZWM2MzRjMjRmIn0sImlhdCI6MTY5MzMxMjQ4MH0.bCgl8uh616FAraQc_R3PQYiOaL2d6WnEz1a_cxE_8VA",
			{
				title,
				description,
				tag: tag.length === 0 ? "General" : tag,
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
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlZGEwYzRiZmMyNGUzZWM2MzRjMjRmIn0sImlhdCI6MTY5MzMxMjQ4MH0.bCgl8uh616FAraQc_R3PQYiOaL2d6WnEz1a_cxE_8VA"
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
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlZGEwYzRiZmMyNGUzZWM2MzRjMjRmIn0sImlhdCI6MTY5MzMxMjQ4MH0.bCgl8uh616FAraQc_R3PQYiOaL2d6WnEz1a_cxE_8VA",
			{
				title,
				description,
				tag,
			}
		);
		console.log(response);
		if (response.success === true) {
			// Logic to edit in client
			for (const note of notes) {
				if (note._id === id) {
					note.title = title;
					note.description = description;
					note.tag = tag;
				}
			}
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
	// Default options are marked with *
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
