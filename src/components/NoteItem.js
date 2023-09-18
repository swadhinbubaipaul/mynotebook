import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = ({ note, updateNote }) => {
	const { deleteNote } = useContext(NoteContext);

	return (
		<div className="w-25 my-3">
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">{note.title}</h5>
					<p className="card-text">{note.description}</p>
					<div className="d-flex flex-wrap align-items-center justify-content-between">
						<p className="card-text mb-0 d-inline-block">
							<small className="text-body-secondary">
								{note.tag}
							</small>
						</p>
						<div>
							<i
								className="fa-regular fa-trash-can mx-2"
								onClick={() => {
									deleteNote(note._id);
								}}
							></i>
							<i
								className="fa-regular fa-pen-to-square mx-2"
								data-bs-toggle="modal"
								data-bs-target="#editNoteModal"
								onClick={() => {
									updateNote(note);
								}}
							></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NoteItem;
