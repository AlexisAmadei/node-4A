const md5 = require("md5");
const { createUser, findUserByEmail } = require("../db/userModel");
const { askLogin } = require('../utils/login');

async function createNewUser(name, email, pwd, address) {
    if (!name || !email || !pwd || !address) {
        throw new Error("Name, email, password, and address are required");
    }
    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            console.log("Email already in use. Please login.");
            console.log('---------------------------');
            askLogin();
            return;
        }
        await createUser(name, email, md5(pwd), address);
        console.log("User created successfully");
    } catch (err) {
        console.error("Error creating user:", err.message);
    }
}

module.exports = { createNewUser };