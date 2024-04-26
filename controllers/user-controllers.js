const { createUser } = require("../models/user-model");

async function signup(req, res) {
  const { username, password } = req.body;

  try {
    await createUser(username, password);

    res.status(201).json({ message: "New user added succesfully" });
  } catch (error) {
    console.error("Error adding user", error);
    res.status(500).json({ message: "Error adding user" });
  }
}

module.exports = { signup };
