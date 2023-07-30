const express = require("express");
const router = express.Router();
const path = require("path");
const notesControllers = require("../controllers/notesControllers");

const { protect } = require("../middleware/authMiddleware");
router.use(protect);
router
	.route("/")
	.get(notesControllers.getAllNotes)
	.post(notesControllers.createNewNote)
	.put(notesControllers.updateNote)
	.delete(notesControllers.deleteNote);

module.exports = router;
