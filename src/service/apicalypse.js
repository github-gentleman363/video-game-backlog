import apicalypse from 'apicalypse';

const API_KEY = "d07b3e3889ab72eaa8c31cec190f4384";

const BASE_URL = "https://api-v3.igdb.com";

const REQUEST_OPTIONS = Object.freeze({
    // url: "/games",
    // queryMethod: 'body',
    method: 'post', // The default is `get`
    baseURL: `https://cors-anywhere.herokuapp.com/${BASE_URL}`,
    headers: {
        'Accept': 'application/json',
        'user-key': API_KEY
    },
    responseType: 'json',
    // timeout: 1000, // 1 second timeout
    // auth: { // Basic auth
    //     username: 'janedoe',
    //     password: 's00pers3cret'
    // }
});

const LIMIT = 10;
const FIELDS = Object.freeze(["name", "summary", "slug", "total_rating", "total_rating_count", "cover.*", "first_release_date, platforms.*"]);

export async function searchGames (val)  {
    try {
        const response = await apicalypse(REQUEST_OPTIONS).fields(FIELDS).limit(LIMIT).search(val).request("/games");
        // This is an axios response: https://github.com/axios/axios#response-schema
        return response?.data;
    } catch (err) {
        console.error(err);
        return err;
    }
}

export async function getGames (gameIds = []) {
    try {
        // TODO: what should be the limit?
        const response = await apicalypse(REQUEST_OPTIONS).fields(FIELDS).where(`id = (${gameIds.join(", ")})`).request("/games");
        // This is an axios response: https://github.com/axios/axios#response-schema
        return response?.data;
    } catch (err) {
        console.error(err);
        return err;
    }
}