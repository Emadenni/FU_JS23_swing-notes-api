const nedb = require("nedb-promise");
const db = new nedb({ filename: "./database/users.db", autoload: true });


async function storeUser(username, password, id) {
  try {
    const user = { username, password, id };
    await db.insert(user);
  } catch (error) {
    console.error("User not stored correctly");
    throw error;
  }
}


async function getUser(username) {
  return db.findOne({ username: username });
}

module.exports = { storeUser, getUser };
