const express = require("express");
const router = express.Router();
const {
	registerUser,
	loginUser,
	getUser,
	logOut,
	updateUser,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOut);
router.route("/profile").get(protect, getUser).put(protect, updateUser);

module.exports = router;
