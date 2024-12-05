require('dotenv').config();
const { API_URL, API_BEARER } = process.env;

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
        console.log(json);
    } catch (err) {
        console.error(err);
    }
}

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

module.exports = {
    getMovieGenre,
    searchMovieByName,
    searchMovieById
};