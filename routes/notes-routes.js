/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Add a new note
 *     description: Add a new note to the database. Requires a valid JWT token for access. Include the token in the Authorization header as 'Bearer <token>'.
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
 *                 description: Title of the note (maximum 50 characters).
 *               text:
 *                 type: string
 *                 maxLength: 300
 *                 description: Text of the note (maximum 300 characters).
 *     responses:
 *       '200':
 *         description: Note added successfully
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
 *         description: Bad request. Text and title are missing or incorrect.
 *         content:
 *           application/json:
 *             example:
 *               error: "Text and title are missing or incorrect"
 *       '422':
 *         description: The title is longer than 50 characters.
 *         content:
 *           application/json:
 *             example:
 *               error: "The title of the note must be at most 50 characters long"
 *       '401':
 *         description: Invalid access. Invalid token.
 *         content:
 *           application/json:
 *             example:
 *               error: "Access denied! Token is required"
 *       '500':
 *         description: Internal server error. Error adding note.
 *         content:
 *           application/json:
 *             example:
 *               error: "Error adding note"
 *
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
 *                   _id: "avb123" 
 *                 - id: "2"
 *                   title: "Sample Note 2"
 *                   text: "This is a sample note 2"
 *                   createdAt: "2024-04-27T12:00:00Z"
 *                   modifiedAt: null
 *                   _id: "avb123"
 *       '401':
 *         description: Invalid access. Invalid token.
 *         content:
 *           application/json:
 *             example:
 *               error: "Access denied! Token is required"
 *       '404':
 *         description: No notes found.
 *         content:
 *           application/json:
 *             example:
 *               error: "No notes found"
 *       '500':
 *         description: Internal server error. Error retrieving notes.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
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
*                 - id: "1"
 *                   title: "Sample Note 1"
 *                   text: "This is a sample note 1"
 *                   createdAt: "2024-04-27T12:00:00Z"
 *                   modifiedAt: null
 *                   _id: "avb123" 
 *       '401':
 *         description: Invalid access. Invalid token.
 *         content:
 *           application/json:
 *             example:
 *               error: "Access denied! Token is required"
 *       '404':
 *         description: Note not found
 *         content:
 *           application/json:
 *             example:
 *               message: Note not found
 *       '500':
 *         description: Internal server error. Error retrieving note.
 *         content:
 *           application/json:
 *             example:
 *               error: "Error retrieving the note"
 *
 *   put:
 *     summary: Update a single note
 *     description: Update a single note in the database by its ID. Requires a valid JWT token for access. Include the token in the Authorization header as 'Bearer <token>'.
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
 *         description: ID of the note to update
 *       - in: body
 *         name: Note
 *         required: true
 *         description: New title and text for the note
 *         schema:
 *           type: object
 *           properties:
 *             newTitle:
 *               type: string
 *               description: New title for the note
 *             newText:
 *               type: string
 *               description: New text for the note
 *     responses:
 *       '200':
 *         description: Successfully updated the note
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               note:
 *                 id: "1"
 *                 title: "Updated Note"
 *                 text: "This is the updated content of the note"
 *                 createdAt: "2024-04-27T12:00:00Z"
 *                 modifiedAt: "2024-04-28T12:00:00Z"
 *                 _id: "avb123" 
 *       '400':
 *         description: Title and text are required
 *         content:
 *           application/json:
 *             example:
 *               error: Title and text are required
  *       '401':
 *         description: Invalid access. Invalid token.
 *         content:
 *           application/json:
 *             example:
 *               error: "Access denied! Token is required"
 *       '404':
 *         description: Note not found
 *         content:
 *           application/json:
 *             example:
 *               error: Note not found
 *       '500':
 *         description: Internal server error. Error updating note.
 *         content:
 *           application/json:
 *             example:
 *               error: "Error updating note"
 *
 *   delete:
 *     summary: Delete a single note
 *     description: Delete a single note by its ID from the database. Requires a valid JWT token for access. Include the token in the Authorization header as 'Bearer <token>'.
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
 *         description: ID of the note to delete
  
 *     responses:
 *       '200':
 *         description: Successfully deleted the note
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: Number of notes deleted:1
*       '400':
 *         description: Missing ID parameter.
 *         content:
 *           application/json:
 *             example:
 *               error: "Missing ID parameter"
*       '401':
 *         description: Invalid access. Invalid token.
 *         content:
 *           application/json:
 *             example:
 *               error: "Access denied! Token is required"
 *       '404':
 *         description: Note not found
 *         content:
 *           application/json:
 *             example:
 *               error: Note not found
 *       '500':
 *         description: Internal server error. Error deleting note.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 *
* /api/notes/search:
 *   get:
 *     summary: Search among notes by title
 *     description: |
 *       Searches among notes in the database based on the provided title. The search is case-insensitive.
 *     tags:
 *       - Notes
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: The title to search for.(ex. /search?title=query)
 *     responses:
 *       '200':
 *         description: A list of notes matching the search criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 result:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Note'
 *             example:
 *               status: success
 *               result:
 *                 - id: "1"
 *                   title: "Found Note"
 *                   text: "This is the result"
 *                   createdAt: "2024-04-27T12:00:00Z"
 *                   modifiedAt: "2024-04-28T12:00:00Z"
 *                   _id: "avb123" 
 *       '400':
 *         description: Bad request. The 'title' parameter is missing or empty.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Title parameter is required and cannot be empty
  *       '401':
 *         description: Invalid access. Invalid token.
 *         content:
 *           application/json:
 *             example:
 *               error: "Access denied! Token is required"
  *       '404':
 *         description: No notes found.
 *         content:
 *           application/json:
 *             example:
 *               error: "No notes found"
 *       '500':
 *         description: Internal server error. Error searching notes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error searching notes
 */

const { Router } = require("express");
const {
  addNote,
  getAllNotes,
  getSingleNote,
  updateSingleNote,
  deleteSingleNote,
} = require("../controllers/notes-controllers");
const { auth } = require("./../middleware/auth");
const { searchAmongNotes } = require("../controllers/search-controller");
const router = Router();

router.get("/search", auth, searchAmongNotes);
router.post("/", auth, addNote);
router.get("/", auth, getAllNotes);
router.get("/:id", auth, getSingleNote);
router.put("/:id", auth, updateSingleNote);
router.delete("/:id", auth, deleteSingleNote);

module.exports = router;
