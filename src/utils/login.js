const { createNewUser } = require('./createUser');
const { askPassword, askAddress } = require('./verifyCredential');

const prompt = require('prompt-sync')({ sigint: true });

function askLogin() {
    console.log("Chatbot : Ravi de vous revoir ! Connectons-nous.");
    const login = prompt("Renseignez votre email et mot de passe (séparés par un espace) : ");
    const [email, password] = login.split(" ");
    return { email, password };
}

function askRegister() {
    console.log("Chatbot : Bienvenue ! Commençons par créer votre compte.");
    let name = askName();
    let email = askEmail();
    let password = askPassword();
    let address = askAddress();
    createNewUser(name, email, password, address);
}

module.exports = { askLogin, askRegister };