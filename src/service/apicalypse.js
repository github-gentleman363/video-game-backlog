import apicalypse from 'apicalypse';

const API_KEY = "d07b3e3889ab72eaa8c31cec190f4384";

const REQUEST_OPTIONS = Object.freeze({
    // url: "/games",
    // queryMethod: 'body',
    method: 'post', // The default is `get`
    baseURL: 'https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com',
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

const FIELDS = Object.freeze(["name", "summary", "slug", "total_rating", "total_rating_count"]);

async function search (val)  {
    if (!val?.trim?.())     return;

    try {
        console.log(`making a request for "${val}"`)
        const response = await apicalypse(REQUEST_OPTIONS).fields(FIELDS).search(val).request("/games");
        // This is an axios response: https://github.com/axios/axios#response-schema
        // console.log(response.data)
        return response?.data;
    } catch (err) {
        console.error(err);
        return err;
    }
}

export default search;