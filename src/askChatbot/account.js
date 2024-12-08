const readline = require('readline');
const { userLogin } = require('../db/userModel');
const { createAuthEntry } = require('../db/authModel');
const colors = require('colors');


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

module.exports = { askLogin };