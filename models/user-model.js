const { storeUser } = require('./../usersDb');

async function createUser(username, password) {
    try {
       await storeUser(username, password);
        console.log('Created new user:', { username, password });
    } catch (error) {
        console.error('Error creating user ', error);
        throw error;
    }
}

module.exports = { createUser };