import {HOST_URL, API_KEY } from "./apiConfig.js";

function throwError(message) {
    throw new Error(message);
}

// Common function to fetch data from the API
async function fetchData(url) {
    const options = {
        method: 'GET',
        headers: {
		'X-RapidAPI-Key': API_KEY,
		'X-RapidAPI-Host': HOST_URL
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        return result;
    } catch (error) {
        console.error(error);
    }
}

// Returns an array of dish objects, one for each dish ID in the provided array
async function getMovieDetails(id) {
    const url = `https://imdb8.p.rapidapi.com/title/get-details?tconst=${id}`;
    console.log("GET");
    return fetchData(url);
}

async function getTopHundred() {
    const url = 'https://imdb8.p.rapidapi.com/title/get-most-popular-movies?homeCountry=US&purchaseCountry=US&currentCountry=US';
    return fetchData(url);

}

// Export the functions
export {
    getMovieDetails,
    fetchData,
    getTopHundred
};





