const { storeNote } = require("./../notesDb")

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

module.exports = { createNote };
