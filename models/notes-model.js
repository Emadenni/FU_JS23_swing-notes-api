const { storeNote, getNotes, getNoteByID } = require("../notesDb");

async function createNote(id, title, text, createdAt, modifiedAt) {
  try {
    await storeNote(id, title, text, createdAt, modifiedAt);
    return {
      id,
      title,
      text,
      createdAt,
      modifiedAt: null,
      update(newTitle, newText) {
        (this.title = newTitle), (this.text = newText), (this.modifiedAt = new Date());
      },
    };
  } catch (error) {
    console.error("Error creating user ", error);
    throw error;
  }
}

async function fetchNotes() {
  try {
    const allNotes = await getNotes();
    return allNotes
  } catch (error) {
    console.error("Error fetching notes ", error);
    throw error;
  }
}

async function fetchNoteByID(noteID) {
  try {
    const noteByID = await getNoteByID(noteID)
    return noteByID
  } catch (error) {
    console.error("Error fetching the note", error);
    throw error;
  }
}
module.exports = { createNote, fetchNotes, fetchNoteByID };
