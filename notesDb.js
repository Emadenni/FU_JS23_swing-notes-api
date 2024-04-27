const nedb = require("nedb-promise");
const { v4: uuidv4 } = require("uuid");

const db = new nedb({ filename: "notes.db", autoload: true });

async function storeNote(id, title, text, createdAt, modifiedAt) {
  try {
    const note = { id, title, text, createdAt, modifiedAt };
    await db.insert(note);
  } catch (error) {
    console.error("Note not stored correctly");
    throw error;
  }
}

async function getNotes() {
  try {
    const allNotes = await db.find({});

    return allNotes;
  } catch (error) {
    console.error("Note not stored correctly");
    throw error;
  }
}
async function getNoteByID(noteID) {
  try {
    const noteByID = await db.findOne({ id: noteID });
    return noteByID;
  } catch (error) {
    console.error("Note not stored correctly");
    throw error;
  }
}

module.exports = { storeNote, getNotes,getNoteByID };
