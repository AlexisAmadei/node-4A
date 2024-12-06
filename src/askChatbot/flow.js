const { getMovieGenre, searchMovieByGenre } = require("../api/movie");
const { movieGenre } = require("../training/training");
const prompt = require("prompt-sync")({ sigint: true });
const colors = require("colors");

async function getGenreAndSearchMovies() {
    try {
        // Fetch and display available genres
        const genresResponse = await getMovieGenre();
        const genres = genresResponse.genres;

        console.log("\n======= Genres disponibles =======".yellow.bold);
        genres.forEach((genre, index) => {
            console.log(`${(index + 1).toString().cyan}. ${genre.name.green}`);
        });
        console.log("==================================\n".yellow);

        // Prompt user to choose a genre
        const input = prompt("Choisissez un genre de film : ".blue);
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

        // Get the selected genre
        const selectedGenre = genreMapping[predicted_response[0]];
        if (selectedGenre) {
            const movies = await searchMovieByGenre(selectedGenre.id);
            console.log(`\n======= ${selectedGenre.label} =======`.green.bold);
            movies.results.forEach((movie, index) => {
                console.log(
                    `${(index + 1).toString().cyan}. ${movie.title.yellow}`
                );
            });
            console.log("=====================================\n".green);
        } else {
            console.log("Désolé, je n'ai pas compris ce genre. Veuillez réessayer.".red);
            getGenreAndSearchMovies();
        }
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
