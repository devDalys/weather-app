import axios from 'axios'
import {Position, RootObject} from "../types/types";

const params = {
    method: 'GET',
    url: 'https://yahoo-weather5.p.rapidapi.com/weather',
    params: {lat: '51.6607780456543', long: '39.20029067993164', format: 'json', u: 'f'},
    headers: {
        'X-RapidAPI-Key': 'f927d541afmsh70353b988d0c498p1ba690jsn2ddaf17ac057',
        'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
    }
}

const locationByCoordsApi = 'https://yahoo-weather5.p.rapidapi.com/weather'
const headers = {
    'X-RapidAPI-Key': 'f927d541afmsh70353b988d0c498p1ba690jsn2ddaf17ac057',
    'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
}

export const getWeather = async (): Promise<RootObject> => {
    return axios.request(params).then(function (response) {
        return response.data
    }).catch(function (error) {
        console.error(error);
    });
}

export const getWeatherByCoordinates = async (coord: Position): Promise<RootObject> => {
    return await axios.get(locationByCoordsApi, {
        headers: headers,
        params: {
            lat: coord.latitude,
            long: coord.longitude
        }
    })
        .then(resp => resp.data)
        .catch(err => err);
}
