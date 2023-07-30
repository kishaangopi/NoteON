const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
	let token;
	token = req.cookies.jwt;

	if (token) {
		try {
			//verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			//GET user form the token
			req.user = await User.findById(decoded.id).select("-password");

			next();
		} catch (err) {
			console.log(err);
			res.status(401).json({ message: "Not authorized" });
		}
	} else {
		res.status(401).json({ message: "Not authorized, not Token" });
	}
});

module.exports = { protect };
