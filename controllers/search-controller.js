const { searchNotesByTitle } = require("../notesDb");

async function searchAmongNotes(req, res) {
  try {
    const { title } = req.query;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title parameter is required and cannot be empty" });
    }

    const query = { title: { $regex: new RegExp(title, "i") } };
    const researchResult = await searchNotesByTitle(query);

    if (researchResult.length === 0) {
      return res.status(404).json({ message: "No notes found" });
    }

    res.status(200).json({ status: "success", result: researchResult });
  } catch (error) {
    console.error("Error searching notes:", error);
    res.status(500).json({ error: "Error searching notes" });
  }
}

module.exports = { searchAmongNotes };
