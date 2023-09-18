const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

// ROUTE 1: Get all the notes using GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", auth, async (req, res) => {
	const notes = await Notes.find({ user: req.user.id });

	res.json({
		success: true,
		notes: notes,
	});
});

// ROUTE 2: Add a new note using GET "/api/notes/addnote". Login required
router.post(
	"/addnote",
	auth,
	[
		body("title", "Enter a valid title").isLength({ min: 3 }),
		body(
			"description",
			"Description must be at least 5 characters"
		).isLength({ min: 5 }),
	],
	async (req, res) => {
		// If there are errors, return Bad request and errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.send({ success: false, errors: errors.array() });
		}

		try {
			const { title, description, tag } = req.body;
			// Create a new user
			const note = new Notes({
				user: req.user.id,
				title: title,
				description: description,
				tag: tag,
			});

			// Save it in db
			await note.save();

			// Send response
			res.json({
				success: true,
				message: "Note saved successfully",
				note: note,
			});
		} catch (error) {
			console.error(error.message);
			res.status(500).json({
				success: false,
				error: "Internal server error",
			});
		}
	}
);

// ROUTE 3: Update an existing note using PUT "/api/notes/updatenote". Login required
router.put("/updatenote/:id", auth, async (req, res) => {
	try {
		const { title, description, tag } = req.body;
		// Create a new note
		const newNote = { title, description };
		if (title) {
			newNote.title = title;
		}
		if (description) {
			newNote.description;
		}
		if (tag) {
			newNote.tag = tag;
		}

		// Find the note and update it
		let note = await Notes.findById(req.params.id);
		if (!note) {
			return res.status(404).json({
				success: false,
				error: "404 not found",
			});
		}

		if (note.user.toString() !== req.user.id) {
			return res.status(401).json({
				success: false,
				error: "Not Allowed",
			});
		}

		note = await Notes.findByIdAndUpdate(req.params.id, newNote, {
			new: true,
		});
		res.json({
			success: true,
			message: "Successfully updated",
			note: note,
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			success: false,
			error: "Internal server error",
		});
	}
});

// ROUTE 4: Delete an existing note using PUT "/api/notes/updatenote". Login required
router.delete("/deletenote/:id", auth, async (req, res) => {
	try {
		// Find the note and delete it
		let note = await Notes.findById(req.params.id);
		if (!note) {
			return res.status(404).json({
				success: false,
				error: "404 not found",
			});
		}

		// Check if user is authorized or not
		if (note.user.toString() !== req.user.id) {
			return res.status(401).json({
				success: false,
				error: "Not Allowed",
			});
		}

		note = await Notes.findByIdAndDelete(req.params.id);
		res.json({
			success: true,
			message: "Successfully deleted",
			note: note,
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			success: false,
			error: "Internal server error",
		});
	}
});
module.exports = router;
