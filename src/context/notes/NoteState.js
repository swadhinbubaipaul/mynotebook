import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
	const notesInitial = [
		{
			_id: "64f6b552479edb5e4c86b345",
			user: "64eda0c4bfc24e3ec634c24f",
			title: "Breakfast",
			description: "11.30 AM in morning!",
			tag: "food",
			date: "2023-09-05T04:57:54.488Z",
			__v: 0,
		},
		{
			_id: "650328f6fb78e60865473d03",
			user: "64eda0c4bfc24e3ec634c24f",
			title: "Dinner",
			description: "11.30 PM in night!",
			tag: "food",
			date: "2023-09-14T15:38:30.323Z",
			__v: 0,
		},
		{
			_id: "650328f6fb78e60865a473d03",
			user: "64eda0c4bfc24e3ec634c24f",
			title: "Dinner",
			description: "11.30 PM in night!",
			tag: "food",
			date: "2023-09-14T15:38:30.323Z",
			__v: 0,
		},
		{
			_id: "650328f6fb78e60s865473d03",
			user: "64eda0c4bfc24e3ec634c24f",
			title: "Dinner",
			description: "11.30 PM in night!",
			tag: "food",
			date: "2023-09-14T15:38:30.323Z",
			__v: 0,
		},
		{
			_id: "650a328f6fb78e60865473d03",
			user: "64eda0c4bfc24e3ec634c24f",
			title: "Dinner",
			description: "11.30 PM in night!",
			tag: "food",
			date: "2023-09-14T15:38:30.323Z",
			__v: 0,
		},
		{
			_id: "650328f6fbs78e60865473d03",
			user: "64eda0c4bfc24e3ec634c24f",
			title: "Dinner",
			description: "11.30 PM in night!",
			tag: "food",
			date: "2023-09-14T15:38:30.323Z",
			__v: 0,
		},
		{
			_id: "650328f6fb78e608654s73d03",
			user: "64eda0c4bfc24e3ec634c24f",
			title: "Dinner",
			description: "11.30 PM in night!",
			tag: "food",
			date: "2023-09-14T15:38:30.323Z",
			__v: 0,
		},
		{
			_id: "65032a8f6fb78e60865473d03",
			user: "64eda0c4bfc24e3ec634c24f",
			title: "Dinner",
			description: "11.30 PM in night!",
			tag: "food",
			date: "2023-09-14T15:38:30.323Z",
			__v: 0,
		},
	];
	const [notes, setNotes] = useState(notesInitial);

	// Add a Note
	const addNote = (title, description, tag) => {
		// TODO: API call
		console.log("Adding a new note");
		const note = {
			_id: "65032a8f6fb7as8e60865473d03",
			user: "64eda0c4bfc24e3ec634c24f",
			title: title,
			description: description,
			tag: "food",
			date: "2023-09-14T15:38:30.323Z",
			__v: 0,
		};
		setNotes(notes.concat(note));
	};
	// Delete a Note
	const deleteNote = (id) => {};
	// Edit a Note
	const editNote = (id) => {};

	return (
		<NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;
