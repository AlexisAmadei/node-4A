const md5 = require("md5");
const { createUser, findUserByEmail } = require("../db/userModel");

async function createNewUser(name, email, password, address) {
    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            console.log(`Chatbot : Un utilisateur avec l'email ${email} existe déjà.`);
            return;
        }
        const hashedPassword = md5(password);
        await createUser(name, email, hashedPassword, address);
        console.log("Chatbot : Compte créé avec succès !");
    } catch (error) {
        console.error("Erreur lors de la création du compte :", error);
    }
}

async function listUsers() {
    const users = await getAllUsers();
    console.log("users :", users);
    // return users;
}

module.exports = { createNewUser, listUsers };