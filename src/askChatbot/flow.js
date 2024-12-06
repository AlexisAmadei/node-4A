const { getMovieGenre, searchMovieByGenre } = require("../api/movie");
const { addItemToCart } = require("../global/userCart");
const { movieGenre, selectMovie } = require("../training/training");
const prompt = require("prompt-sync")({ sigint: true });
const colors = require("colors");

async function askSpecificMovie(movies) {
    const input = prompt("Quel film vous intéresse ? ".blue);
    const predicted_response = selectMovie.classify(input);

    if (predicted_response[0]) {
        const movieIndex = parseInt(predicted_response[0].replace("movie", "")) - 1;

        if (movies[movieIndex]) {
            addItemToCart(movies[movieIndex].id, movies[movieIndex].title);
        } else {
            console.log("Désolé, je n'ai pas compris votre choix. Veuillez réessayer.".red);
            await askSpecificMovie(movies);
        }
    } else {
        console.log("Désolé, je n'ai pas compris votre choix. Veuillez réessayer.".red);
        await askSpecificMovie(movies);
    }
}

async function askGenre() {
    const input = prompt("Quel genre de film vous intéresse ? ".blue);
    const predicted_response = movieGenre.classify(input);

    const genreMapping = {
        action: { id: 28, label: "Films d'action" },
        animation: { id: 16, label: "Films d'animation" },
        adventure: { id: 12, label: "Films d'aventure" },
        comedy: { id: 35, label: "Films de comédie" },
        crime: { id: 80, label: "Films de crime" },
        documentary: { id: 99, label: "Films documentaires" },
        drama: { id: 18, label: "Films dramatiques" },
        family: { id: 10751, label: "Films familiaux" },
        fantasy: { id: 14, label: "Films fantastiques" },
    };

    const selectedGenre = genreMapping[predicted_response[0]];
    if (selectedGenre) {
        const movies = await searchMovieByGenre(selectedGenre.id);
        console.log(`\n======= ${selectedGenre.label} =======`.green.bold);
        movies.results.forEach((movie, index) => {
            console.log(`${(index + 1).toString().cyan}. ${movie.title.yellow}`);
        });
        console.log("=====================================\n".green);

        await askSpecificMovie(movies.results);
    } else {
        console.log("Désolé, je n'ai pas compris ce genre. Veuillez réessayer.".red);
        await askGenre(); // Recursive call if genre is invalid
    }
}

async function getGenreAndSearchMovies() {
    try {
        const genres = await getMovieGenre();
        console.log("Voici quelques genres de films :".green);
        genres.genres.forEach(genre => {
            console.log(`${genre.id.toString().cyan}. ${genre.name.yellow}`);
        });
        console.log("=====================================\n".green);

        await askGenre();
    } catch (error) {
        console.error("Erreur :", error.message.red);
    }
}

async function chatbotFlow(name) {
    console.log(`\nBonjour ${name} !`.green.bold);
    await getGenreAndSearchMovies();
    console.log("Chatbot : Au revoir !".blue);
}

module.exports = { chatbotFlow };
