/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Add a new note
 *     description: Add a new note in the database. Require a valid token to give right to access.
 *     tags:
 *       - Notes
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 50
 *                 description: Titolo della nota (massimo 50 caratteri).
 *               text:
 *                 type: string
 *                 maxLength: 300
 *                 description: Testo della nota (massimo 300 caratteri).
 *     responses:
 *       '200':
 *         description: Note added succesfully
 *         content:
 *           application/json:
 *             example:
 *               status: "success"
 *               message: "Note added successfully"
 *               note:
 *                 id: "1"
 *                 title: "Sample Note"
 *                 text: "This is a sample note"
 *                 createdAt: "2024-04-27T12:00:00Z"
 *                 modifiedAt: null
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: "Text and title are missing or incorrect"
 *       '401':
 *         description: Invalid access
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid token"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Error adding noted"
 */


const { Router } = require("express");
const { addNote, getAllNotes, getSingleNote } = require("../controllers/notes-controllers");
const { auth } = require("./../middleware/auth");
const router = Router();

router.post("/", auth, addNote);
router.get("/", getAllNotes);
router.get("/:id",  getSingleNote);


module.exports = router;
