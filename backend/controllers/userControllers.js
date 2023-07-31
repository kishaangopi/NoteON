const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
	const { username, password, email } = req.body;

	if (!username || !password || !email) {
		res.status(400).json({ message: "Please fill all the fields" });
	}

	const duplicateUser = await User.findOne({ username });
	if (duplicateUser) {
		res.status(400).json({ message: "Username already exists" });
	}

	const user = await User.create({ username, password, email });

	if (user) {
		generateToken(res, user._id);
		res.status(201).json({
			_id: user._id,
			username: user.username,
			email: user.email,
		});
	} else {
		res.status(400).json({ message: "User not created" });
	}
});

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	console.log(req.body);

	if (!email || !password) {
		return res.status(400).json({ message: "Please fill all the fields" });
	}

	const user = await User.findOne({ email });
	if (user && (await user.matchPassword(password))) {
		generateToken(res, user._id);

		res.json({
			_id: user._id,
			username: user.username,
			email: user.email,
		});
	} else {
		res.status(401).json({ message: "Invalid credentials" });
	}
});

const logOut = asyncHandler(async (req, res) => {
	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0),
	});

	res.status(200).json({ message: "Logged out" });
});

const getUser = asyncHandler(async (req, res) => {
	const { _id, username, email } = await User.findById(req.user._id);

	res.status(200).json({
		id: _id,
		username,
		email,
	});
});

const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;

		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.status(200).json({
			_id: updatedUser._id,
			username: updatedUser.username,
			email: updatedUser.email,
		});
	} else {
		req.status(404).json({ message: "User not found" });
	}
});

module.exports = {
	registerUser,
	loginUser,
	getUser,
	updateUser,
	logOut,
};
