const { getMovieGenre, searchMovieByName, searchMovieById } = require('./utils/movie');

searchMovieByName('the matrix').then(response => {
    if (response && response.results && response.results.length > 0) {
        response.results.forEach(movie => {
            console.log(`Title: ${movie.original_title}`);
            console.log(`Overview: ${movie.overview}`);
            console.log('---');
        });
    } else {
        console.log('No movie found');
    }
}).catch(error => {
    console.error(error);
});

searchMovieById(603).then(response => {
    console.log(`Title: ${response.original_title}`);
    console.log(`Overview: ${response.overview}`);
}).catch(error => {
    console.error(error);
});

getMovieGenre().then(response => {
    if (response && response.genres && response.genres.length > 0) {
        response.genres.forEach(genre => {
            console.log(`ID: ${genre.id}`);
            console.log(`Name: ${genre.name}`);
            console.log('---');
        });
    } else {
        console.log('No genre found');
    }
}).catch(error => {
    console.error(error);
});