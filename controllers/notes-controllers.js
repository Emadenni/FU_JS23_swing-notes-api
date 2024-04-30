const { createNote, fetchNotes, fetchNoteByID, updateNote, deleteNote } = require("../models/notes-model");
const { v4: uuidv4 } = require("uuid");
const { db, getNotes } = require("../notesDb");
const { json } = require("express");

async function addNote(req, res) {
  const { title, text } = req.body;

  if (!title || !text) {
    return res.status(400).json({ error: "Text and title are missing or incorrect" });
  }

  if (title.length > 50) {
    return res.status(422).json({ error: "The title of the note must be at most 50 characters long" });
  }

  if (text.length > 300) {
    return res.status(422).json({ error: "The text of the note must be at most 300 characters long" });
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

    if (allNotes.length === 0) {
      return res.status(404).json({ error: "No notes found" });
    }

    res.status(200).json({ status: "succes", notes: allNotes });
  } catch (error) {
    console.error("Error retrieving notes:", error);
    res.status(500).json({ error: "Error retrieving notes" });
  }
}

async function getSingleNote(req, res) {
  try {
    const noteID = req.params.id;
    const singleNote = await fetchNoteByID(noteID);

    if (singleNote === null) {
      console.error("Note not found with ID:", noteID);
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json({ status: "success", note: singleNote });
  } catch (error) {
    console.error("Error retrieving the note:", error);
    res.status(500).json({ error: "Error retrieving the note" });
  }
}

async function updateSingleNote(req, res) {
  try {
    const noteID = req.params.id;
    const { newTitle, newText } = req.body;

    if (!newTitle || !newText) {
      console.error("Title and text are required");
      return res.status(400).json({ error: "Title and text are required" });
    }

    const updatedNote = await updateNote(noteID, newTitle, newText);

    if (!updatedNote) {
      console.error("Note not found");
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json({ status: "success", note: updatedNote });
  } catch (error) {
    console.error("Error updating single note:", error);
    res.status(500).json({ error: "Error updating single note" });
  }
}

async function deleteSingleNote(req, res) {
  try {
    
    if (!req.params.id) {
      return res.status(400).json({ error: "Missing ID parameter" });
    }
    const nodeID = req.params.id;

    const deletedNote = await deleteNote(nodeID);

    if (!deletedNote) {
      console.error("Note not found");
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json({ status: "success", message: `number of notes deleted : ${deletedNote} ` });
  } catch (error) {
    console.error("Error deleting single note:", error);
    res.status(500).json({ error: "Error deleting single note" });
  }
}
module.exports = { addNote, getAllNotes, getSingleNote, updateSingleNote, deleteSingleNote };
