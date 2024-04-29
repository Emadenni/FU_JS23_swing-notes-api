const { searchNotesByTitle, searchNotesByTitleCaseInsensitive } = require("../notesDb");

async function searchNotes(query) {
  try {
    const notesToSearch = searchNotesByTitle(query);
    return notesToSearch;
  } catch (error) {
    console.error("Error searching the note", error);
    throw error;
  }
}

module.exports = {
  searchNotes,
};
