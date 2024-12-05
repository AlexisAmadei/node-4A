const { userLogin } = require('../db/userModel');
const { createNewUser } = require('./createUser');
const { askPassword, askAddress, askName, askEmail } = require('./verifyCredential');
const prompt = require('prompt-sync')({ sigint: true });

async function askLogin() {
    console.log("Chatbot : Bienvenue ! Veuillez vous connecter.");
    let credentials = prompt("Entrez votre email et mot de passe (séparés par un espace) : ");
    let [email, password] = credentials.split(' ');

    if (!email || !password) {
        console.log("Chatbot : Veuillez fournir à la fois un email et un mot de passe.");
        return askLogin();
    }

    try {
        let success = await userLogin(email, password);
        if (success) {
            console.log("Chatbot : Connexion réussie !");
            return email;
        } else {
            console.log("Chatbot : Email ou mot de passe incorrect. Réessayez s'il vous plaît.");
            return askLogin();
        }
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
    }
}


async function askRegister() {
    console.log("Chatbot : Bienvenue ! Commençons par créer votre compte.");
    let name = askName();
    let email = askEmail();
    let password = askPassword();
    let address = askAddress();
    try {
        await createNewUser(name, email, password, address);
        console.log("Chatbot : Votre compte a été créé avec succès !");
        console.log("Chatbot : Redirection vers la connexion...");
        await askLogin();
    } catch (error) {
        console.error("Erreur lors de la création du compte :", error);
    }
}

module.exports = { askLogin, askRegister };