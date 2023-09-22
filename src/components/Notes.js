import { useContext, useState, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import EditNoteModal from "./EditNoteModal";

const Notes = ({ showAlert }) => {
	const [note, setNote] = useState({ title: "", description: "", tag: "" });
	const { notes, getNotes } = useContext(NoteContext);

	useEffect(() => {
		getNotes();
		// eslint-disable-next-line
	}, []);

	const updateNote = (currentNote) => {
		setNote(currentNote);
	};

	return (
		<>
			<AddNote showAlert={showAlert} />
			<EditNoteModal
				note={note}
				setNote={setNote}
				showAlert={showAlert}
			/>
			<div className="row my-3">
				<h2>Your Notes</h2>
				{notes.length === 0 && (
					<p className="fs-5">No Notes to display</p>
				)}
				{notes.map((note) => {
					return (
						<NoteItem
							key={note._id}
							note={note}
							updateNote={updateNote}
							showAlert={showAlert}
						/>
					);
				})}
			</div>
		</>
	);
};

export default Notes;
