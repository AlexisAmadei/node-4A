const limdu = require('limdu');
const { askLogin, askRegister } = require('./utils/login');
const prompt = require('prompt-sync')({ sigint: true });

var TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
    binaryClassifierType: limdu.classifiers.Winnow.bind(0, { retrain_count: 10 })
});

var WordExtractor = function (input, features) {
    input.split(" ").forEach(function (word) {
        features[word] = 1;
    });
};

var chatbot = new limdu.classifiers.EnhancedClassifier({
    classifierType: TextClassifier,
    featureExtractor: WordExtractor
});

chatbot.trainBatch([
    { input: "nouveau", output: "newUser" },
    { input: "je suis nouveau", output: "newUser" },
    { input: "nouvel utilisateur", output: "newUser" },
    { input: "je n'ai pas de compte", output: "newUser" },
    { input: "j'ai déjà un compte", output: "oldUser" },
    { input: "existant", output: "oldUser" },
    { input: "je suis existant", output: "oldUser" },
    { input: "déjà existant", output: "oldUser" },
    { input: "exit", output: "exit" },
    { input: "quitter", output: "exit" },
    { input: "au revoir", output: "exit" },
    { input: "bye", output: "exit" }
]);

function startChatbot() {
    if (startChatbot.firstRun === undefined) {
        console.clear();
        startChatbot.firstRun = false;
    }
    console.log("Chatbot : Bonjour et bienvenue !");

    let input = prompt("Êtes-vous un nouvel utilisateur ou déjà existant ? ").toLowerCase();
    let predicted_response = chatbot.classify(input);

    if (predicted_response[0] === "newUser") {
        askRegister();
    } else if (predicted_response[0] === "oldUser") {
        askLogin();
    } else if (predicted_response[0] === "exit") {
        console.log("Chatbot : Au revoir !");
        return;
    } else {
        console.log("Chatbot : Je n'ai pas bien compris. Veuillez répondre par 'nouveau' ou 'existant'.");
        startChatbot();
    }
}

startChatbot();