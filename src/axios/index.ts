import axios from 'axios'
import {RootObject} from "../types/types";

const params = {
    method: 'GET',
    url: 'https://yahoo-weather5.p.rapidapi.com/weather',
    params: {location: 'sunnyvale', format: 'json', u: 'f'},
    headers: {
        'X-RapidAPI-Key': 'f927d541afmsh70353b988d0c498p1ba690jsn2ddaf17ac057',
        'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
    }
}

export const getWeather = async (): Promise<RootObject> => {
    return axios.request(params).then(function (response) {
        return response.data
    }).catch(function (error) {
        console.error(error);
    });
}
