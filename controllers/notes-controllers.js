const { createNote, fetchNotes, fetchNoteByID } = require("./../models/notes-model");
const { v4: uuidv4 } = require("uuid");
const { db, getNotes } = require("../notesDb");
const { json } = require("express");

async function addNote(req, res) {
  const { title, text } = req.body;

  if (title.length > 50) {
    return res.status(400).json({ error: "The title of the note must be at most 50 characters long" });
  }

  if (text.length > 300) {
    return res.status(400).json({ error: "The text of the note must be at most 300 characters long" });
  }

  if (!title || !text) {
    return res.status(400).json({ error: "Text and title are missing or incorrect" });
  }

  try {
    const id = uuidv4();
    const createdAt = new Date();
    const modifiedAt = null;
    const note = await createNote(id, title, text, createdAt, modifiedAt);
    res.status(200).json({ status: "succes", message: "Note added successfully", note });
  } catch (error) {
    console.error("Error adding note", error);
    res.status(500).json({ message: "Error adding note" });
  }
}

async function getAllNotes(req, res) {
  try {
    const allNotes = await fetchNotes();

    res.status(200).json({status: "succes" ,notes: allNotes});
  } catch (error) {
    console.error("Error retrieving notes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getSingleNote(req, res) {
  try {
    const noteID = req.params.id;
    const singleNote = await fetchNoteByID(noteID); 

    if (!singleNote) {
      return res.status(404).json({ message: 'Note not found' })
    }

    res.status(200).json({ status: "success", note: singleNote });
 
  } catch (error) {
    console.error("Error retrieving the note:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { addNote, getAllNotes, getSingleNote };
