import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const EditNoteModal = ({ note, setNote }) => {
	const { editNote } = useContext(NoteContext);

	const handleClick = (e) => {
		e.preventDefault();
		editNote(note._id, note.title, note.description, note.tag);
		setNote({ title: "", description: "", tag: "" });
	};

	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	return (
		<div>
			<div
				className="modal fade"
				id="editNoteModal"
				tabIndex="-1"
				aria-labelledby="editNoteModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1
								className="modal-title fs-5"
								id="editNoteModalLabel"
							>
								Edit Note
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<form autoComplete="off">
								<div className="mb-3">
									<label
										htmlFor="editTitle"
										className="form-label"
									>
										Title
									</label>
									<input
										type="text"
										className="form-control"
										id="editTitle"
										aria-describedby="emailHelp"
										name="title"
										value={note.title}
										onChange={onChange}
									/>
								</div>
								<div className="mb-3">
									<label
										htmlFor="editDescription"
										className="form-label"
									>
										Description
									</label>
									<input
										type="text"
										className="form-control"
										id="editDescription"
										name="description"
										value={note.description}
										onChange={onChange}
									/>
								</div>
								<div className="mb-3">
									<label
										htmlFor="editTag"
										className="form-label"
									>
										Tag
									</label>
									<input
										type="text"
										className="form-control"
										id="editTag"
										name="tag"
										value={note.tag}
										onChange={onChange}
									/>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
							>
								Close
							</button>
							<button
								type="button"
								className="btn btn-primary"
								onClick={handleClick}
								data-bs-target="#editNoteModal"
								data-bs-toggle="modal"
							>
								Update Note
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditNoteModal;
