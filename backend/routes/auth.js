const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Create a user using POST "/api/auth". Doesn't require Auth
router.post("/", async (req, res) => {
	console.log(req.body);
	const user = User(req.body);
	await user.save();
	res.send(req.body);
});

module.exports = router;
