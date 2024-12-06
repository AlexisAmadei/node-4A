const colors = require('colors');
const prompt = require('prompt-sync')({ sigint: true });

const { askLogin, askRegister } = require('./askChatbot/account');
const { chatbotFlow } = require('./askChatbot/flow');
const { chatbot } = require('./training/training');



async function startChatbot() {
    var userConnected = {
        name: "",
        email: "",
        password: "",
        address: ""
    };

    if (startChatbot.firstRun === undefined) {
        console.clear();
        startChatbot.firstRun = false;
    }

    console.log("Bonjour et bienvenue !".green.bold);

    while (true) {
        if (!userConnected.email) {
            let input = prompt("-> Êtes-vous un nouvel utilisateur ou déjà existant ? ").toLowerCase();
            let predicted_response = chatbot.classify(input);

            if (predicted_response[0] === "newUser") {
                await askRegister();
            } else if (predicted_response[0] === "oldUser") {
                userConnected.email = await askLogin();
            } else if (predicted_response[0] === "exit") {
                console.log("Chatbot : Au revoir !".blue);
                return;
            } else {
                console.log("Chatbot : Je n'ai pas bien compris. Veuillez répondre par 'nouveau' ou 'existant'.".yellow);
            }
        } else {
            console.log(`Chatbot : Vous êtes déjà connecté en tant que ${userConnected.email}.`.green);
            console.log("-------------------------".cyan);
            await chatbotFlow(userConnected.email);
            return;
        }
    }
}

startChatbot();
