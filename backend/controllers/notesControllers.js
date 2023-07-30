const asyncHandler = require("express-async-handler");
const Note = require("../models/notesModel");
const User = require("../models/userModel");

const getAllNotes = asyncHandler(async (req, res) => {
	const notes = await Note.find({ user: req.user.id });

	if (!notes?.length) {
		return res.status(204).json({ message: "No notes found" });
	}
	res.json(notes);
});

const createNewNote = asyncHandler(async (req, res) => {
	const { title, content, important, status } = req.body;

	if (!title || !content || !status) {
		return res.status(400).json({ message: "Please fill all the fields" });
	}

	const duplicate = await Note.findOne({ title }).lean().exec();

	if (duplicate) {
		return res
			.status(409)
			.json({ message: "Note with this title already exists" });
	}

	const note = await Note.create({
		title,
		content,
		important,
		status,
		user: req.user.id,
	});

	if (note) {
		res.status(201).json(note);
	} else {
		res.status(500).json({ message: "Note creation failed" });
	}
});

const updateNote = asyncHandler(async (req, res) => {
	const { id, title, content, important, status } = req.body;

	if (!id || !title || !content || !status || typeof important != "boolean") {
		return res.status(400).json({ message: "Please fill all the fields" });
	}

	const note = await Note.findById(id).exec();
	if (!note) {
		return res.status(404).json({ message: "Note not found" });
	}

	const duplicate = await Note.findOne({ title }).lean().exec();
	if (duplicate && duplicate._id.toString() != id) {
		return res
			.status(409)
			.json({ message: "Note with this title already exists" });
	}

	const user = await User.findById(req.user.id);
	if (!user) {
		return res.status(401).json({ message: "User not found" });
	}

	if (note.user.toString() !== user.id.toString()) {
		return res.status(401).json({ message: "You are not authorized" });
	}

	note.title = title;
	note.content = content;
	note.important = important;
	note.status = status;

	const updatedNote = await note.save();

	res.json(updatedNote);
});

const deleteNote = asyncHandler(async (req, res) => {
	const { id } = req.body;

	if (!id) {
		return res.status(400).json({ message: "Please provide a note id" });
	}

	const note = await Note.findById(id);

	if (!note) {
		return res.status(404).json({ message: "Note not found" });
	}

	const user = await User.findById(req.user.id);
	if (!user) {
		return res.status(401).json({ message: "User not found" });
	}

	if (note.user.toString() !== user.id.toString()) {
		return res.status(401).json({ message: "You are not authorized" });
	}

	const deleteNote = await note.deleteOne();

	res.json({ message: "Note deleted successfully" });
});

module.exports = {
	getAllNotes,
	createNewNote,
	updateNote,
	deleteNote,
};
