const { searchNotesByQuery} = require("../database/notesDb");

async function searchNotes(query) {
  try {
    const notesToSearch = searchNotesByQuery(query);
    return notesToSearch;
  } catch (error) {
    console.error("Error searching the note", error);
    throw error;
  }
}

module.exports = {
  searchNotes,
};
