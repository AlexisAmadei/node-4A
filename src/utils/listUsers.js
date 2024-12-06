const { getAllUsers } = require("../db/userModel");

async function listUsers() {
    const users = await getAllUsers();
    console.log("users :", users);
    // return users;
}

listUsers();

module.exports = {
    listUsers
};