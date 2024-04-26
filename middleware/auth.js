const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(400).json({ message: "Access denied! Token is required" });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    res.status(400).send("Invalid token");
  }
};

module.exports = { auth };
