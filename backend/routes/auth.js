const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Create a user using POST "/api/auth". Doesn't require Auth
router.post(
	"/createuser",
	[
		body("name", "Enter a valid name").isLength({ min: 3 }),
		body("email", "Enter a valid email").isEmail(),
		body("password", "Password must be at least 5 characters").isLength({
			min: 5,
		}),
	],
	async (req, res) => {
		// If there are errors, return Bad request and errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.send({ success: false, errors: errors.array() });
		}

		// Check whether the user with this email exists already
		try {
			let user = await User.findOne({ email: req.body.email });
			if (user) {
				return res.status(400).json({
					success: false,
					error: "Sorry, an user with this email already exists",
				});
			}

			// Create a new user
			user = new User({
				name: req.body.name,
				password: req.body.password,
				email: req.body.email,
			});

			// Save it in db
			await user.save();

			res.json({
				success: true,
				message: "User created",
				user: user,
			});
		} catch (error) {
			console.error(error.message);
			res.status(500).json({
				success: false,
				error: "Some error occured",
			});
		}
	}
);

module.exports = router;
