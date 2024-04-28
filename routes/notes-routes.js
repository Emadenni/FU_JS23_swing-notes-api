/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Add a new note
 *     description: Add a new note in the database.Requires a valid JWT token for access. Include the token in the Authorization header as 'Bearer <token>'.
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
 *   get:
 *     summary: Get all notes
 *     description: Retrieve all notes from the database. Requires a valid JWT token for access. Include the token in the Authorization header as 'Bearer <token>'.
 *     tags:
 *       - Notes
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved all notes
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               notes:
 *                 - id: "1"
 *                   title: "Sample Note 1"
 *                   text: "This is a sample note 1"
 *                   createdAt: "2024-04-27T12:00:00Z"
 *                   modifiedAt: null
 *                 - id: "2"
 *                   title: "Sample Note 2"
 *                   text: "This is a sample note 2"
 *                   createdAt: "2024-04-27T12:00:00Z"
 *                   modifiedAt: null
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 *
 * /api/notes/{id}:
 *   get:
 *     summary: Get a single note
 *     description: Retrieve a single note by its ID from the database. Requires a valid JWT token for access. Include the token in the Authorization header as 'Bearer <token>'.
 *     tags:
 *       - Notes
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the note to retrieve
 *     responses:
 *       '200':
 *         description: Successfully retrieved the note
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               note:
 *                 id: "1"
 *                 title: "Sample Note"
 *                 text: "This is a sample note"
 *                 createdAt: "2024-04-27T12:00:00Z"
 *                 modifiedAt: null
 *       '404':
 *         description: Note not found
 *         content:
 *           application/json:
 *             example:
 *               message: Note not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */

const { Router } = require("express");
const { addNote, getAllNotes, getSingleNote, updateSingleNote } = require("../controllers/notes-controllers");
const { auth } = require("./../middleware/auth");
const router = Router();

router.post("/", auth, addNote);
router.get("/", auth, getAllNotes);
router.get("/:id", auth, getSingleNote);
router.put("/:id", auth, updateSingleNote);

module.exports = router;
