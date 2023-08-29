const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "Swadhinisagoodboy$";

// ROUTE 1: Create a user using POST "/api/auth/createuser". No ligin required
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

			const password = req.body.password;
			const excryptedPassword = await bcrypt.hash(password, 10);

			// Create a new user
			user = new User({
				name: req.body.name,
				password: excryptedPassword,
				email: req.body.email,
			});

			// Save it in db
			await user.save();

			const data = {
				user: {
					id: user.id,
				},
			};

			// Create token
			const authToken = jwt.sign(data, JWT_SECRET);

			// Return token
			res.json({
				success: true,
				message: "User created",
				authToken: authToken,
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

// ROUTE 2: Login user using POST "/api/auth/login".
router.post(
	"/login",
	[
		body("email", "Enter a valid email").isEmail(),
		body("password", "Password cannot be blank").exists(),
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
			const { email, password } = req.body;

			// Check whether the user with this email exists already
			let user = await User.findOne({ email });
			if (!user && !(await bcrypt.compare(password, user.password))) {
				return res.status(400).json({
					success: false,
					error: "Please try to login with correct credentials",
				});
			}

			const data = {
				user: {
					id: user.id,
				},
			};

			// Create token
			const authToken = jwt.sign(data, JWT_SECRET);

			// Return token
			res.json({
				success: true,
				message: "Login successful",
				authToken: authToken,
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

// ROUTE 3: Get logged in User details using POST "/api/auth/getuser". Login required
router.post("/getuser", fetchUser, async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId).select("-password");
		res.send(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			success: false,
			error: "Internal server error",
		});
	}
});

module.exports = router;
