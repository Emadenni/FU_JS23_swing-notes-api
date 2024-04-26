const { createNote } = require("./../models/notes-model");
const { v4: uuidv4 } = require("uuid");
const { db } = require("./../notesDb");

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
module.exports = { addNote };
