const express = require ("express");
// const { getNotes, createNote, deleteNote, updateNote } = require("./controlers/noteControler");
const auth = require("../middlewares/auth");
const { getNotes, createNote, deleteNote, updateNote } = require("../controlers/noteControler");
const noteRouter = express.Router();

noteRouter.get("/", auth, getNotes);
noteRouter.post("/", auth, createNote); 
noteRouter.delete("/:id", auth, deleteNote);
noteRouter.put("/:id", auth, updateNote);
module.exports = noteRouter;