const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");

// ROUTE 1: Get all the notes using GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
	const notes = await Notes.find({ user: req.user.id });
	res.json(notes);
});

// ROUTE 2: Add a new note using GET "/api/notes/addnote". Login required
router.post(
	"/addnote",
	fetchUser,
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

module.exports = router;
