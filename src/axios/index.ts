import axios from 'axios'
import {Position, RootObject} from "../types/types";


const weatherApiUrl = 'https://yahoo-weather5.p.rapidapi.com/weather'
const headers = {
    'X-RapidAPI-Key': 'f927d541afmsh70353b988d0c498p1ba690jsn2ddaf17ac057',
    'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
}

export const getWeatherByCity = async (location: string): Promise<RootObject> => {
    return axios.get(weatherApiUrl, {
        headers: headers,
        params: {
            location: location
        }
    }).then(function (response) {
        return response.data
    }).catch(function (error) {
        console.error(error);
    });
}

export const getWeatherByCoordinates = async (coord: Position): Promise<RootObject> => {
    return await axios.get(weatherApiUrl, {
        headers: headers,
        params: {
            lat: coord.latitude,
            long: coord.longitude
        }
    })
        .then(resp => resp.data)
        .catch(err => err);
}
