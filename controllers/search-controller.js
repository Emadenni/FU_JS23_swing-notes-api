const { searchNotes } = require("../models/search-model");
const db = require("../database/usersDb");

async function searchAmongNotes(req, res) {
  try {
    const { title } = req.query;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title parameter is required and cannot be empty" });
    }

    const query = { title: { $regex: new RegExp(title, "i") } };
    const researchResult = await searchNotes(query);

    if (researchResult.length === 0) {
      return res.status(404).json({ message: "No notes found" });
    }

    res.status(200).json({ status: "success", result: researchResult });
  } catch (error) {
    console.error("Error searching notes:", error);
    res.status(500).json({ error: "Error searching notes" });
  }
}


async function searchAmongNotesByUser(req, res) {
  try {
    const { user } = req.query;

    if (!user || user.trim() === "") {
      return res.status(400).json({ error: "User parameter is required and cannot be empty" });
    }

    const existingUser = await db.getUser({ $regex: new RegExp(user, "i") });

    if (!existingUser) {
      return res.status(418).json({ error: "User not found" });
    }

    const query = { user: { $regex: new RegExp(user, "i") } };
    const researchResult = await searchNotes(query);

    if (researchResult.length === 0) {
      return res.status(404).json({ message: "No notes found" });
    }

    res.status(200).json({ status: "success", result: researchResult });
  } catch (error) {
    console.error("Error searching notes:", error);
    res.status(500).json({ error: "Error searching notes" });
  }
}

module.exports = { searchAmongNotes, searchAmongNotesByUser };
