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
    { input: "j'ai déjà un compte", output: "oldUser" },
    { input: "existant", output: "oldUser" },
    { input: "je suis existant", output: "oldUser" },
    { input: "déjà existant", output: "oldUser" },
    { input: "exit", output: "exit" },
    { input: "quitter", output: "exit" },
    { input: "au revoir", output: "exit" },
    { input: "bye", output: "exit" }
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
])

module.exports = {
    chatbot,
    movieGenre
};