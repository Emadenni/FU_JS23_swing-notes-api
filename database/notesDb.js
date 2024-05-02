const nedb = require("nedb-promise");
const { v4: uuidv4 } = require("uuid");

const db = new nedb({ filename: "./database/notes.db", autoload: true });
async function storeNote(id, title, text, createdAt, modifiedAt, user) {
try {
    const note = { id, title, text, createdAt, modifiedAt,user };
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
    return noteByID || null;
  } catch (error) {
    console.error("Error getting note");
    throw error;
  }
}
async function getNotesByUser(user) {
  try {
    const noteByUser = await db.findOne({ user: user });
    return noteByUser || null;
  } catch (error) {
    console.error("Error getting notes");
    throw error;
  }
}

async function modifiedNoteByID(noteToUpdate) {
  try {
    await db.update({ id: noteToUpdate.id }, noteToUpdate);
  } catch (error) {
    console.error("Error modifying note:", error);
    throw error;
  }
}

async function removeNoteByID(noteToDelete) {
  try {
    const numRemoved = await db.remove({ id: noteToDelete.id });
    return numRemoved;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
}

async function searchNotesByQuery(query) {
  try {
    const notes = await db.find(query);

    return notes;
  } catch (error) {
    console.error("Error searching notes:", error);
    throw error;
  }
}

module.exports = {
  storeNote,
  getNotes,
  getNoteByID,
  modifiedNoteByID,
  removeNoteByID,
  searchNotesByQuery,
  getNotesByUser
};
