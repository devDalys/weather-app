import axios from "axios";
import { Position, RootObject, translateResponse } from "../types/types";

const weatherApiUrl = "https://yahoo-weather5.p.rapidapi.com/weather";
const translateApiUrl = "https://translo.p.rapidapi.com/api/v3/translate";
const weatherHeaders = {
  "X-RapidAPI-Key": "f927d541afmsh70353b988d0c498p1ba690jsn2ddaf17ac057",
  "X-RapidAPI-Host": "yahoo-weather5.p.rapidapi.com",
};

const translateHeaders = {
  "X-RapidAPI-Key": "f927d541afmsh70353b988d0c498p1ba690jsn2ddaf17ac057",
  "X-RapidAPI-Host": "translo.p.rapidapi.com",
  "content-type": "application/x-www-form-urlencoded",
};

export const getTranslate = async (
  text: string
): Promise<translateResponse> => {
  return await axios
    .request({
      url: translateApiUrl,
      method: "POST",
      headers: translateHeaders,
      data: {
        from: "en",
        to: "ru",
        text,
      },
    })
    .then((data) => {
      return data.data;
    })
    .catch((err) => {return err});
};

export const getWeatherByCity = async (
  location: string
): Promise<RootObject> => {
  return axios
    .get(weatherApiUrl, {
      headers: weatherHeaders,
      params: {
        location: location,
      },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const getWeatherByCoordinates = async (
  coord: Position
): Promise<RootObject> => {
  return await axios
    .get(weatherApiUrl, {
      headers: weatherHeaders,
      params: {
        lat: coord.latitude,
        long: coord.longitude,
      },
    })
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      return err;
    });
};
