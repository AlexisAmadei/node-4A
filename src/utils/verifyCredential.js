const prompt = require('prompt-sync')({ sigint: true });

function verifyEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function verifyPassword(password) {
    const passwordRegex = /^.{5,}$/;
    return passwordRegex.test(password);
}

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

module.exports = {
    verifyEmail,
    verifyPassword,
    askEmail,
    askPassword,
    askName,
    askAddress
};