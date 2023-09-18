import { useContext, useState, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import EditNoteModal from "./EditNoteModal";

const Notes = () => {
	const [note, setNote] = useState({ title: "", description: "", tag: "" });
	const { notes, getNotes } = useContext(NoteContext);

	useEffect(() => {
		getNotes();
	}, []);

	const updateNote = (currentNote) => {
		setNote(currentNote);
	};

	return (
		<>
			<AddNote />
			<EditNoteModal note={note} setNote={setNote} />
			<div className="row my-3">
				<h2>Your Notes</h2>
				{notes.map((note) => {
					return (
						<NoteItem
							key={note._id}
							note={note}
							updateNote={updateNote}
						/>
					);
				})}
			</div>
		</>
	);
};

export default Notes;
