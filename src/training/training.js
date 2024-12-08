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
    { input: "rien", output: "exit" },
    { input: "sortir", output: "exit" },
    { input: "quitter", output: "exit" },
    { input: "exit", output: "exit" },
    { input: "au revoir", output: "exit" },
    { input: "bye", output: "exit" },
    { input: "fermer", output: "exit" },
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
    { input: "le sixième", output: "movie6" },
    { input: "numéro six", output: "movie6" },
    { input: "le 6", output: "movie6" },
    { input: "sixième film", output: "movie6" },
    { input: "le septième", output: "movie7" },
    { input: "numéro sept", output: "movie7" },
    { input: "le 7", output: "movie7" },
    { input: "septième film", output: "movie7" },
    { input: "le huitième", output: "movie8" },
    { input: "numéro huit", output: "movie8" },
    { input: "le 8", output: "movie8" },
    { input: "huitième film", output: "movie8" },
    { input: "le neuvième", output: "movie9" },
    { input: "numéro neuf", output: "movie9" },
    { input: "le 9", output: "movie9" },
    { input: "neuvième film", output: "movie9" },
    { input: "le dixième", output: "movie10" },
    { input: "numéro dix", output: "movie10" },
    { input: "le 10", output: "movie10" },
    { input: "dixième film", output: "movie10" },
    { input: "le onzième", output: "movie11" },
    { input: "numéro onze", output: "movie11" },
    { input: "le 11", output: "movie11" },
    { input: "onzième film", output: "movie11" },
    { input: "le douzième", output: "movie12" },
    { input: "numéro douze", output: "movie12" },
    { input: "le 12", output: "movie12" },
    { input: "douzième film", output: "movie12" },
    { input: "le treizième", output: "movie13" },
    { input: "numéro treize", output: "movie13" },
    { input: "le 13", output: "movie13" },
    { input: "treizième film", output: "movie13" },
    { input: "le quatorzième", output: "movie14" },
    { input: "numéro quatorze", output: "movie14" },
    { input: "le 14", output: "movie14" },
    { input: "quatorzième film", output: "movie14" },
    { input: "le quinzième", output: "movie15" },
    { input: "numéro quinze", output: "movie15" },
    { input: "le 15", output: "movie15" },
    { input: "quinzième film", output: "movie15" },
    { input: "le seizième", output: "movie16" },
    { input: "numéro seize", output: "movie16" },
    { input: "le 16", output: "movie16" },
    { input: "seizième film", output: "movie16" },
    { input: "le dix-septième", output: "movie17" },
    { input: "numéro dix-sept", output: "movie17" },
    { input: "le 17", output: "movie17" },
    { input: "dix-septième film", output: "movie17" },
    { input: "le dix-huitième", output: "movie18" },
    { input: "numéro dix-huit", output: "movie18" },
    { input: "le 18", output: "movie18" },
    { input: "dix-huitième film", output: "movie18" },
    { input: "le dix-neuvième", output: "movie19" },
    { input: "numéro dix-neuf", output: "movie19" },
    { input: "le 19", output: "movie19" },
    { input: "dix-neuvième film", output: "movie19" },
    { input: "le vingtième", output: "movie20" },
    { input: "numéro vingt", output: "movie20" },
    { input: "le 20", output: "movie20" },
    { input: "vingtième film", output: "movie20" },
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
    { input: "payer", output: "cart" },
    { input: "passer à la caisse", output: "cart" },
    { input: "caisse", output: "cart" },
    { input: "checkout", output: "cart" },

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

    { input: "aide", output: "help" },
    { input: "aider", output: "help" },
    { input: "besoin d'aide", output: "help" },
    { input: "je suis perdu", output: "help" },
    { input: "je ne sais pas quoi faire", output: "help" },
    { input: "je ne comprends pas", output: "help" },
    { input: "je suis bloqué", output: "help" },
    { input: "je suis coincé", output: "help" },
    { input: "je suis dans une impasse", output: "help" },
]);

module.exports = {
    chatbot,
    movieGenre,
    selectMovie,
    interMenu
};