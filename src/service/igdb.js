import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://api-key-proxy.herokuapp.com';
const URL = `${BASE_URL}/games`;

const LIMIT = 10;
const FIELDS = Object.freeze(["name", "summary", "slug", "total_rating", "total_rating_count", "cover.*", "first_release_date, platforms.*"]);

export async function searchGames (val)  {
    try {
        const response = await axios.get(URL, {
            params: { fields: FIELDS.join(","), limit: LIMIT, search: val }
        });

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
        const response = await axios.get(URL, {
            params: { fields: FIELDS.join(","), "filter[id][eq]": `(${gameIds.join(",")})` }
        });

        // This is an axios response: https://github.com/axios/axios#response-schema
        return response?.data;
    } catch (err) {
        console.error(err);
        return err;
    }
}