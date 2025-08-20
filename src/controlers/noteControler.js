const noteModel = require("../models/notes");

// CREATE a note
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const newNote = new noteModel({
            title,
            content,
            userId: req.userId  
        });

        await newNote.save();
        res.status(201).json({ success: true, message: "Note created successfully", note: newNote });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating note", error: error.message });
    }
};

// UPDATE a note
const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const note = await noteModel.findOneAndUpdate(
            { _id: id, userId: req.userId },   // Only allow user to update their own notes
            { title, content },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ success: false, message: "Note not found or unauthorized" });
        }

        res.status(200).json({ success: true, message: "Note updated successfully", note });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating note", error: error.message });
    }
};

// DELETE a note
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        const note = await noteModel.findOneAndDelete({ _id: id, userId: req.userId });

        if (!note) {
            return res.status(404).json({ success: false, message: "Note not found or unauthorized" });
        }

        res.status(200).json({ success: true, message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting note", error: error.message });
    }
};

// GET all notes for a user
const getNotes = async (req, res) => {
    try {
        const notes = await noteModel.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, notes });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching notes", error: error.message });
    }
};

module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNotes
};
