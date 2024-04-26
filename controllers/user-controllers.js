const { createUser } = require("../models/user-model");
const db = require("./../usersDb");
const { hashPassword, comparePasswords } = require("./../bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

async function signup(req, res) {
  const { username, password } = req.body;
  const existingUser = await db.getUser(username);

  if (existingUser) {
    return res.status(418).json({ error: "Username already exists" });
  }

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are missing or incorrect" });
  }

  try {
    const id = uuidv4();
    const hashedPassword = await hashPassword(password);
    await createUser(username, hashedPassword, id);

    res.status(200).json({
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

  if (user == null) {
    res.status(404).send("User not found");
    return;
  }

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are missing or incorrect" });
  }

  try {
    const validPassword = await comparePasswords(password, user.password);

    if (validPassword) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 30000 });
      let result = { token: token };
      res.status(200).json({
        status: "success",
        message: "Login successful",
        token,
      });
    } else {
      res.status(400).send("Wrong password");
    }
  } catch (error) {
    console.error("Error checking password", error);
    res.status(500).send("Internal server error");
  }
}

module.exports = { signup, login };
