const jwt = require("jsonwebtoken");

//generate token
const generateToken = (res, id) => {
	const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

	res.cookie("jwt", token, {
		httpOnly: false,
		secure: true,
		sameSite: "strict",
		maxAge: 30 * 24 * 60 * 60 * 1000,
		domain: "note-on-phi.vercel.app",
	});
};

module.exports = generateToken;
