const { Router } = require("express");
const { addNote } = require("../controllers/notes-controllers");
const { auth } = require("./../middleware/auth");
const router = Router();

router.post("/", auth, addNote);

module.exports = router;
