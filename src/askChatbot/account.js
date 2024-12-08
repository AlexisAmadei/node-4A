const readline = require('readline');
const { userLogin } = require('../db/userModel');
const { createAuthEntry } = require('../db/authModel');
const colors = require('colors');
const { createNewUser } = require('../utils/user');
const { verifyEmail, verifyPassword } = require('../utils/verifyCredential');
const prompt = require('prompt-sync')({ sigint: true });


/**
 * Asks the user to provide an email address.
 */
function askEmail() {
    let email = prompt("Veuillez entrer votre email : ");
    if (!verifyEmail(email)) {
        console.log("Chatbot : L'email que vous avez entré est invalide.");
        askEmail();
    }
    return email;
}

/**
 * Asks the user to provide a password.
 * @returns {string} The password provided by the user.
*/
function askPassword() {
    let password = prompt("Veuillez entrer votre mot de passe : ");
    if (!verifyPassword(password)) {
        console.log("Chatbot : Le mot de passe que vous avez entré est invalide.");
        askPassword();
    }
    return password;
}

/**
 * Asks the user to provide a name.
 * @returns {string} The name provided by the user.
 */
function askName() {
    let name = prompt("Veuillez entrer votre nom : ");
    if (!name) {
        console.log("Chatbot : Le nom est requis.");
        askName();
    }
    return name;
}

/**
 * Asks the user to provide an address.
 * @returns {string} The address provided by the user.
*/
function askAddress() {
    let address = prompt("Veuillez entrer votre adresse : ");
    if (!address) {
        console.log("Chatbot : L'adresse est requise.");
        askAddress();
    }
    return address;
}

/**
 * Asks the user to register.
 * @returns {Promise} A promise that resolves when the user is registered.
 */
async function askRegister() {
    console.log("Chatbot : Bienvenue ! Commençons par créer votre compte.");
    let name = askName();
    let email = askEmail();
    let password = askPassword();
    let address = askAddress();
    try {
        await createNewUser(name, email, password, address);
        console.log("Chatbot : Votre compte a été créé avec succès !");
        console.log("Chatbot : Redirection vers le menu principal...");
        return;
    } catch (error) {
        console.error("Erreur lors de la création du compte :", error);
    }
}

async function askLogin() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const question = (query) =>
        new Promise((resolve) => rl.question(query, (answer) => resolve(answer)));

    console.log("Chatbot : Bienvenue ! Veuillez vous connecter.".green);

    while (true) {
        const email = await question("Email (ou tapez 'quit' pour quitter) : ".blue);
        if (email.toLowerCase() === 'quit') {
            console.log("Chatbot : Déconnexion. À bientôt !".yellow);
            rl.close();
            return null;
        }

        const password = await question("Mot de passe : ".blue);

        if (!email || !password) {
            console.log("Chatbot : Veuillez fournir à la fois un email et un mot de passe.".red);
            continue;
        }

        try {
            const user = await userLogin(email, password);
            if (!user) {
                console.log("Chatbot : Email ou mot de passe incorrect. Réessayez s'il vous plaît.".red);
                continue;
            }
            const auth = await createAuthEntry(user.id, user.email);
            console.log("Chatbot : Connexion réussie !".green);
            rl.close();
            return user.email;
        } catch (error) {
            console.error("Erreur lors de la connexion :", error.message.red);
            rl.close();
            break;
        }
    }
}

module.exports = { askLogin, askRegister };