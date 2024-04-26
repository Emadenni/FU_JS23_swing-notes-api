/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Creates account
 *     description: Creates user's accounts and saves them in the database .
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
 *         description: New user added succesfully
 *       '400':
 *         description: Username and password are missing or incorrect
 *       '418':
 *         description: Username already exists
 *       '500':
 *         description: Error adding user
 * /api/user/login:
 *   post:
 *     summary: Login users
 *     description: Give access to user's account.
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
 *       '404':
 *         description: User not found
 *       '400':
 *         description: Username and password are missing or incorrect
 *       '500':
 *         description: Internal server error
 */

const { Router } = require("express");
const { signup, login } = require("../controllers/user-controllers");
const router = Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
