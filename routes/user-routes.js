/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Create account
 *     description: Creates user's accounts and saves them in the database.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: New user added successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: User created successfully
 *               userId: "cc4c70c6-3a50-49bc-b631"
 *       '400':
 *         description: Username and password are missing or incorrect
 *         content:
 *           application/json:
 *             example:
 *               error: Username and password are missing or incorrect
 *       '418':
 *         description: Username already exists
 *         content:
 *           application/json:
 *             example:
 *               error: Username already exists
 *       '422':
 *         description: Password must be at least 8 characters long
 *         content:
 *           application/json:
 *             example:
 *               error: Password must be at least 8 characters long
 *       '500':
 *         description: Error adding user
 *         content:
 *           application/json:
 *             example:
 *               message: Error adding user
 * /api/user/login:
 *   post:
 *     summary: Login users
 *     description: Give access to user's account. Generate a token avaible for 10 minutes.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: Login successful
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               error: User not found
 *       '400':
 *         description: Username and password are missing or incorrect
 *         content:
 *           application/json:
 *             example:
 *               error: Username and password are missing or incorrect
 *       '401':
 *         description: Wrong password
 *         content:
 *           application/json:
 *             example:
 *               error: Wrong password!
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */

const { Router } = require("express");
const { signup, login } = require("../controllers/user-controllers");
const router = Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
