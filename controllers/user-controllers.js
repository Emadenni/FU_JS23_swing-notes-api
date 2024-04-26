const { createUser } = require("../models/user-model");
const db = require("./../usersDb");
const { hashPassword, comparePassword } = require("./../bcrypt");
const { v4: uuidv4 } = require("uuid");

async function signup(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are missing or incorrect" });
  }

  try {
    const existingUser = await db.getUser(username);
    if (existingUser) {
      return res.status(418).json({ error: "Username already exists" });
    }

    const id = uuidv4();

    const hashedPassword = await hashPassword(password);
   await createUser(username, hashedPassword, id);

    res.status(201).send({
      status: "success",
      message: "User created successfully",
      userId: id,
    });
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ message: "Error creating user" });
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  const user = await db.getUser(username);
}

module.exports = { signup };
