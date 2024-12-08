require('dotenv').config();
const { API_URL, API_BEARER } = process.env;

/**
 * Fetches the movie genres from the API.
 * @returns {Promise} The response from the API.
 */
async function getMovieGenre() {
    const url = `${API_URL}/genre/movie/list`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_BEARER}`
        }
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        if (!json.genres) {
            throw new Error('Genres not found in the response');
        }
        return json;
    } catch (err) {
        console.error('Error fetching movie genres:', err);
        throw err;
    }
}

/**
 * Fetches movies by name from the API.
 * @param {string} name - The name of the movie to search for.
 * @returns {Promise} The response from the API.
 */
async function searchMovieByName(name) {
    const endpoint = '/search/movie';
    const url = `${API_URL}${endpoint}?query=${name}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_BEARER}`
        }
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        return json;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

/**
 * Fetches a movie by ID from the API.
 * @param {number} id - The ID of the movie to search for.
 * @returns {Promise} The response from the API.
 */
async function searchMovieById(id) {
    const endpoint = `/movie/${id}`;
    const url = `${API_URL}${endpoint}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_BEARER}`
        }
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        return json;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

/**
 * Fetches trending movies from the API.
 * @returns {Promise} The response from the API.
 */
async function getTrendingMovies() {
    const endpoint = '/trending/movie/week';
    const url = `${API_URL}${endpoint}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_BEARER}`
        }
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        return json;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

/**
 * Fetches movies by genre from the API.
 * @param {number} genreId - The ID of the genre to search for.
 * @returns {Promise} The response from the API.
 */
async function searchMovieByGenre(genreId) {
    const endpoint = '/discover/movie';
    const url = `${API_URL}${endpoint}?with_genres=${genreId}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_BEARER}`
        }
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        // console.log(json);
        return json;
    } catch (err) {
        if (err.code === 'UND_ERR_CONNECT_TIMEOUT') {
            console.error('Timeout error at searchMovieByGenre');
        } else {
            console.error(err);
        }
    }
}

module.exports = {
    getMovieGenre,
    searchMovieByName,
    searchMovieById,
    getTrendingMovies,
    getMovieGenre,
    searchMovieByGenre
};
