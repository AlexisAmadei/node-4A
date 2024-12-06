const limdu = require("limdu");

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

// general chatbot training
chatbot.trainBatch([
    { input: "nouveau", output: "newUser" },
    { input: "je suis nouveau", output: "newUser" },
    { input: "nouvel utilisateur", output: "newUser" },
    { input: "je n'ai pas de compte", output: "newUser" },
    { input: "créer un compte", output: "newUser" },
    { input: "inscription", output: "newUser" },

    { input: "j'ai déjà un compte", output: "oldUser" },
    { input: "existant", output: "oldUser" },
    { input: "je suis existant", output: "oldUser" },
    { input: "déjà existant", output: "oldUser" },
    { input: "connexion", output: "oldUser" },
    { input: "se connecter", output: "oldUser" },

    { input: 'je suis admin', output: 'admin' },
    { input: 'admin', output: 'admin' },
    { input: 'je suis un administrateur', output: 'admin' },
    { input: 'administrateur', output: 'admin' },
    { input: 'gestionnaire', output: 'admin' },
    { input: 'modérateur', output: 'admin' },

    { input: "exit", output: "exit" },
    { input: "quitter", output: "exit" },
    { input: "au revoir", output: "exit" },
    { input: "bye", output: "exit" },
    { input: "sortir", output: "exit" },
    { input: "fermer", output: "exit" },
]);


var movieGenre = new limdu.classifiers.EnhancedClassifier({
    classifierType: TextClassifier,
    featureExtractor: WordExtractor
});
movieGenre.trainBatch([
    { input: "action", output: "action" },
    { input: "animation", output: "animation" },
    { input: "adventure", output: "adventure" },
    { input: "aventure", output: "adventure" },
    { input: "comedy", output: "comedy" },
    { input: "comédie", output: "comedy" },
    { input: "crime", output: "crime" },
    { input: "documentary", output: "documentary" },
    { input: "documentaire", output: "documentary" },
    { input: "drame", output: "drama" },
    { input: "family", output: "family" },
    { input: "familial", output: "family" },
    { input: "fantastique", output: "fantasy" },
    { input: "fantasy", output: "fantasy" },
    { input: "history", output: "history" },
    { input: "histoire", output: "history" },
    { input: "horreur", output: "horror" },
    { input: "horror", output: "horror" },
    { input: "music", output: "music" },
    { input: "musique", output: "music" },
    { input: "mystery", output: "mystery" },
    { input: "mystère", output: "mystery" },
    { input: "romance", output: "romance" },
    { input: "science fiction", output: "sf" },
    { input: "science-fiction", output: "sf" },
    { input: "tv movie", output: "tv movie" },
    { input: "thriller", output: "thriller" },
    { input: "war", output: "war" },
    { input: "western", output: "western" },
]);

var selectMovie = new limdu.classifiers.EnhancedClassifier({
    classifierType: TextClassifier,
    featureExtractor: WordExtractor
});
selectMovie.trainBatch([
    { input: "le premier", output: "movie1" },
    { input: "numéro un", output: "movie1" },
    { input: "le 1", output: "movie1" },
    { input: "premier film", output: "movie1" },
    { input: "le deuxième", output: "movie2" },
    { input: "numéro deux", output: "movie2" },
    { input: "le 2", output: "movie2" },
    { input: "deuxième film", output: "movie2" },
    { input: "le troisième", output: "movie3" },
    { input: "numéro trois", output: "movie3" },
    { input: "le 3", output: "movie3" },
    { input: "troisième film", output: "movie3" },
    { input: "le quatrième", output: "movie4" },
    { input: "numéro quatre", output: "movie4" },
    { input: "le 4", output: "movie4" },
    { input: "quatrième film", output: "movie4" },
    { input: "le cinquième", output: "movie5" },
    { input: "numéro cinq", output: "movie5" },
    { input: "le 5", output: "movie5" },
    { input: "cinquième film", output: "movie5" },
]);

var interMenu = new limdu.classifiers.EnhancedClassifier({
    classifierType: TextClassifier,
    featureExtractor: WordExtractor
});
interMenu.trainBatch([
    { input: "je veux ajouter un autre film", output: "restart" },
    { input: "ajouter un autre film", output: "restart" },
    { input: "un autre film", output: "restart" },
    { input: "ajouter film", output: "restart" },
    { input: "rajouter un film", output: "restart" },
    { input: "choisir un autre film", output: "restart" },
    { input: "continuer à ajouter", output: "restart" },

    { input: "je veux voir mon panier", output: "cart" },
    { input: "voir mon panier", output: "cart" },
    { input: "mon panier", output: "cart" },
    { input: "afficher le panier", output: "cart" },
    { input: "qu'est-ce qu'il y a dans mon panier ?", output: "cart" },
    { input: "contenu du panier", output: "cart" },

    { input: "je veux annuler", output: "cancel" },
    { input: "annuler", output: "cancel" },
    { input: "stopper l'opération", output: "cancel" },
    { input: "revenir en arrière", output: "cancel" },
    { input: "stop", output: "cancel" },
    { input: "annuler la sélection", output: "cancel" },

    { input: "je veux quitter", output: "exit" },
    { input: "quitter", output: "exit" },
    { input: "sortir", output: "exit" },
    { input: "terminer", output: "exit" },
    { input: "fermer", output: "exit" },
    { input: "exit", output: "exit" },
]);

module.exports = {
    chatbot,
    movieGenre,
    selectMovie,
    interMenu
};