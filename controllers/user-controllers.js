const { createUser } = require("../models/user-model");
const db = require("./../usersDb");
const { hashPassword, comparePassword } = require("./../bcrypt");

async function signup(req, res) {
  const { username, password } = req.body;

  try {
    const existingUser = await db.getUser(username);
    if (existingUser) {
      return res.status(418).json({ error: "Username already exists" });
    }

    const hashedPassword = await hashPassword(password);
       await createUser(username, hashedPassword);

    res.status(201).json({ message: "New user added succesfully" });
  } catch (error) {
    console.error("Error adding user", error);
    res.status(500).json({ message: "Error adding user" });
  }
}


module.exports = { signup };

