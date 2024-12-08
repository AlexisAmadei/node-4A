const limdu_cart = require("limdu");

var TextClassifier = limdu_cart.classifiers.multilabel.BinaryRelevance.bind(0, {
    binaryClassifierType: limdu_cart.classifiers.Winnow.bind(0, { retrain_count: 10 })
});

var WordExtractor = function (input, features) {
    input.split(" ").forEach(function (word) {
        features[word] = 1;
    });
};

var chatbot_cart = new limdu_cart.classifiers.EnhancedClassifier({
    classifierType: TextClassifier,
    featureExtractor: WordExtractor
});

chatbot_cart.trainBatch([
    // Add item to cart
    { input: "ajouter un objet au panier", output: "add" },
    { input: "mettre un produit dans le panier", output: "add" },
    { input: "je veux ajouter un article", output: "add" },
    { input: "ajouter au panier", output: "add" },

    // Empty cart
    { input: "vider le panier", output: "empty" },
    { input: "effacer tout du panier", output: "empty" },
    { input: "supprimer tous les articles", output: "empty" },
    { input: "nettoyer mon panier", output: "empty" },

    // Get cart
    { input: "qu'est-ce qu'il y a dans mon panier ?", output: "get" },
    { input: "afficher le contenu du panier", output: "get" },
    { input: "je veux voir mon panier", output: "get" },
    { input: "affiche les articles du panier", output: "get" },

    // Remove item from cart
    { input: "supprimer un objet", output: "remove" },
    { input: "enlever un produit du panier", output: "remove" },
    { input: "retirer un article", output: "remove" },
    { input: "je veux enlever cet objet", output: "remove" },

    // Checkout cart
    { input: "payer", output: "checkout" },
    { input: "finaliser la commande", output: "checkout" },
    { input: "je veux payer", output: "checkout" },
    { input: "valider mon panier", output: "checkout" },

    // return to main menu
    { input: "retour", output: "restart" },
    { input: "revenir en arrière", output: "restart" },
    { input: "menu principal", output: "restart" },
    { input: "recommencer", output: "restart" },
    { input: "rien", output: "restart" }
]);

module.exports = { chatbot_cart };