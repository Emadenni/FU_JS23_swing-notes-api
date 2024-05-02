const { text } = require("express");
const { storeNote, getNotes, getNoteByID, modifiedNoteByID, removeNoteByID } = require("../database/notesDb");

async function createNote(id, title, text, createdAt, modifiedAt, user) {
  try {
    await storeNote(id, title, text, createdAt, modifiedAt, user);
    return {
      id,
      title,
      text,
      createdAt,
      modifiedAt: null,
      user,
    };
  } catch (error) {
    console.error("Error creating user ", error);
    throw error;
  }
}

async function fetchNotes() {
  try {
    const allNotes = await getNotes();
    return allNotes;
  } catch (error) {
    console.error("Error fetching notes ", error);
    throw error;
  }
}

async function fetchNoteByID(noteID) {
  try {
    const noteByID = await getNoteByID(noteID);

    return noteByID || null;
  } catch (error) {
    console.error("Error fetching the note", error);
    throw error;
  }
}

async function updateNote(nodeID, newTitle, newText) {
  try {
    const noteToUpdate = await getNoteByID(nodeID);

    if (!noteToUpdate) {
      return null;
    }
    
    if (newTitle) {
      noteToUpdate.title = newTitle;
    }

    if (newText) {
      noteToUpdate.text = newText;
    }
    noteToUpdate.modifiedAt = new Date();

    await modifiedNoteByID(noteToUpdate);

    return noteToUpdate;
  } catch (error) {
    console.error("Error uppdating the note", error);
    throw error;
  }
}

async function deleteNote(nodeID) {
  try {
    if (!nodeID) {
      return null;
    }

    const noteToDelete = await getNoteByID(nodeID);

    if (!noteToDelete) {
      return null;
    }

    const deletedNote = await removeNoteByID(noteToDelete);

    return deletedNote;
  } catch (error) {
    console.error("Error deleting the note", error);
    throw error;
  }
}
module.exports = { createNote, fetchNotes, fetchNoteByID, updateNote, deleteNote };
