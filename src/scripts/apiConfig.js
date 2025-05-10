import axios from 'https://cdn.skypack.dev/axios';

//API end points url
const api_endpoints =
{
    "searchExhibitions":
    {
        "description": "searchExhibitions",
        "url": "/exhibitions/search",
        "limit": 100,
        "page": 1,
        "fields": "id",
        "param": "query[term][is_featured]=true"
    },
    "exhibitions": {
        "description": "exhibition",
        "url": `/exhibitions`,
        "limit": 1,
        "page": 1,
        "fields": "id,image_url,title,short_description,gallery_title,artist_ids,aic_start_at,aic_end_at",
        "param": "ids"

    },
    "artists":{
        "description": "artists",
        "url": `/agents`,
        "limit": 1,
        "page": 1,
        "fields": "id,title",
        "param": "ids"
    },
    "artist":{
        "description":"artistinfo",
        "url":'/agents',
        "limit": 1,
        "page": 1,
        "fields": "id,title,birth_date,death_date,description",
        "param": "ids"
    },
    "artistWorks":{
        "description":"artist works",
        "url":'/agents',
        "limit": 10,
        "page": 1,
        "fields": "id,title,birth_date,death_date,description",
        "param": "ids"
    }
};

//set config defaults when created instance for API instance
const instance = axios.create({ baseURL: "https://api.artic.edu/api/v1" });

/**
 * Function that getting featured exhibition Ids
 */
async function getFeaturedExhibitionsId() {
    //list of exhibitions Ids
    let exhibitionIds = [];
    //create a get request url
    let url = `${api_endpoints.searchExhibitions.url}?${api_endpoints.searchExhibitions.param}&fields=${api_endpoints.searchExhibitions.fields}&limit=${api_endpoints.searchExhibitions.limit}`;
    try {
        const response = await instance.get(url);
        exhibitionIds = response.data.data.map((el) => { return el.id })
        //change the limit of exhibitions
        api_endpoints.exhibitions.limit = Math.min(100, exhibitionIds.length)
        //return Ids separated by commas
        return exhibitionIds.join(',')
    } catch (error) {
        throw `Do not get exhibitions! Error: ${error}`
    }

}

async function getArtistsNames(artistsIds) {
    api_endpoints.artists.limit = Math.min(100,artistsIds.length);
    //create a get request url 
    let url = `${api_endpoints.artists.url}?fields=${api_endpoints.artists.fields}&${api_endpoints.artists.param}=${artistsIds.join(',')}&limit=${api_endpoints.artists.limit}`;
    try {
        const response = await instance.get(url);
        return response.data.data;
    } catch (error) {
        throw `Could not get artists info. Error: ${error}`
    }
}

async function getExhibitionsData() {
    //get featured exhibitions Id
    let ids = await getFeaturedExhibitionsId();
    //create a get request url 
    let url = `${api_endpoints.exhibitions.url}?fields=${api_endpoints.exhibitions.fields}&${api_endpoints.exhibitions.param}=${ids}&limit=${api_endpoints.exhibitions.limit}`;
    //try to get information from API
    try {
        const response = await instance.get(url);
        //return information about featured exhibition
        return response.data.data;
    } catch (error) {
        throw `Could not get exhibitions info. Error: ${error}`
    }

}

async function getArtistInfo(artist_id) {
    //create url for artist endpoint
    let url = ""
}


export { getExhibitionsData, getArtistsNames,getArtistInfo };