const express = require("express");
const bcrypt = require("bcrypt");
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

		try {
			// Check whether the user with this email exists already
			let user = await User.findOne({ email: req.body.email });
			if (user) {
				return res.status(400).json({
					success: false,
					error: "Sorry, an user with this email already exists",
				});
			}

			const plaintextPassword = req.body.password;
			const saltRounds = 10;
			bcrypt.hash(
				plaintextPassword,
				saltRounds,
				async function (err, hash) {
					// Store hash in your password DB.
					// Create a new user
					if (err) {
						console.error("err");
						res.status(500).json({
							success: false,
							error: "Some error occured",
						});
					} else {
						user = new User({
							name: req.body.name,
							password: hash,
							email: req.body.email,
						});

						// Save it in db
						await user.save();

						res.json({
							success: true,
							message: "User created",
							user: user,
						});
					}
				}
			);
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
