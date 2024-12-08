const { userLogin } = require('../db/userModel');
const { createNewUser } = require('../utils/user');
const { verifyEmail, verifyPassword } = require('../utils/verifyCredential');
const prompt = require('prompt-sync')({ sigint: true });
const { createAuthEntry } = require('../db/authModel');

function askEmail() {
    let email = prompt("Veuillez entrer votre email : ");
    if (!verifyEmail(email)) {
        console.log("Chatbot : L'email que vous avez entré est invalide.");
        askEmail();
    }
    return email;
}

function askPassword() {
    let password = prompt("Veuillez entrer votre mot de passe : ");
    if (!verifyPassword(password)) {
        console.log("Chatbot : Le mot de passe que vous avez entré est invalide.");
        askPassword();
    }
    return password;
}

function askName() {
    let name = prompt("Veuillez entrer votre nom : ");
    if (!name) {
        console.log("Chatbot : Le nom est requis.");
        askName();
    }
    return name;
}

function askAddress() {
    let address = prompt("Veuillez entrer votre adresse : ");
    if (!address) {
        console.log("Chatbot : L'adresse est requise.");
        askAddress();
    }
    return address;
}

async function askLogin() {
    console.log("Chatbot : Bienvenue ! Veuillez vous connecter.".green);

    while (true) {
        const credentials = prompt("Entrez votre email et mot de passe (séparés par un espace) ou tapez 'quit' pour quitter : ".blue);
        if (credentials.toLowerCase() === "quit") {
            console.log("Chatbot : Déconnexion. À bientôt !".yellow);
            return null;
        }

        const [email, password] = credentials.split(' ');

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
            return user.email;
        } catch (error) {
            console.error("Erreur lors de la connexion :", error.message.red);
        }
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
        console.log("Chatbot : Redirection vers le menu principal...");
        return;
    } catch (error) {
        console.error("Erreur lors de la création du compte :", error);
    }
}

module.exports = { askRegister, askLogin };