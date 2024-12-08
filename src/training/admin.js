const limdu_admin = require("limdu");

var TextClassifier = limdu_admin.classifiers.multilabel.BinaryRelevance.bind(0, {
    binaryClassifierType: limdu_admin.classifiers.Winnow.bind(0, { retrain_count: 10 })
});

var WordExtractor = function (input, features) {
    input.split(" ").forEach(function (word) {
        features[word] = 1;
    });
};

var chatbot_admin = new limdu_admin.classifiers.EnhancedClassifier({
    classifierType: TextClassifier,
    featureExtractor: WordExtractor
});

chatbot_admin.trainBatch([
    // List Users
    { input: "consulter les utilisateurs", output: "listUsers" },
    { input: "voir tous les utilisateurs", output: "listUsers" },
    { input: "liste des utilisateurs", output: "listUsers" },
    { input: "afficher les utilisateurs", output: "listUsers" },
    { input: "utilisateur", output: "listUsers" },
    { input: "utilisateurs", output: "listUsers" },

    // List Orders
    { input: "consulter les commandes", output: "listOrders" },
    { input: "voir toutes les commandes", output: "listOrders" },
    { input: "liste des commandes", output: "listOrders" },
    { input: "afficher les commandes", output: "listOrders" },
    { input: "commandes", output: "listOrders" },

    // Delete User
    { input: "supprimer un utilisateur", output: "deleteUser" },
    { input: "enlever un utilisateur", output: "deleteUser" },
    { input: "effacer un utilisateur", output: "deleteUser" },
    { input: "retirer un utilisateur", output: "deleteUser" },
    { input: "utilisateur à supprimer", output: "deleteUser" },

    // Delete Order
    { input: "supprimer une commande", output: "deleteOrder" },
    { input: "enlever une commande", output: "deleteOrder" },
    { input: "effacer une commande", output: "deleteOrder" },
    { input: "retirer une commande", output: "deleteOrder" },
    { input: "commande à supprimer", output: "deleteOrder" },

    // Exit
    { input: "quitter", output: "exit" },
    { input: "sortir", output: "exit" },
    { input: "fermer", output: "exit" },
    { input: "terminer", output: "exit" },
    { input: "stop", output: "exit" },

    // User Mode
    { input: "interface utilisateur", output: "userMode" },
    { input: "passer en mode utilisateur", output: "userMode" },
    { input: "mode utilisateur", output: "userMode" },
    { input: "changer pour utilisateur", output: "userMode" },
    { input: "interface client", output: "userMode" },
]);

module.exports = { chatbot_admin };