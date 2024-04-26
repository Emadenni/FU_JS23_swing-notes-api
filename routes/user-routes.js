/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Add new users
 *     description: Add new users in the database.
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
 *       '201':
 *         description: New user added succesfully
 *       '418':
 *         description: Username already exists
 *       '500':
 *         description: Error adding user
 */

const { Router } = require("express");
const { signup } = require("../controllers/user-controllers");
const router = Router();



router.post('/signup', signup)

module.exports = router;