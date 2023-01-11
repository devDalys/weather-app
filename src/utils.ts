import { Coordinates, JSONCities, RootObject, Seasons } from "./types/types";
import { format } from "date-fns";
import { Clouds, Rain, Snow, Sunny } from "./components/icons";

const currentMonth = new Date().getMonth();

export const seasonBackground = (): Seasons => {
  if ([11, 0, 1].includes(currentMonth)) {
    return Seasons.Winter;
  } else if ([2, 3, 4].includes(currentMonth)) {
    return Seasons.Spring;
  } else if ([5, 6, 7].includes(currentMonth)) {
    return Seasons.Summer;
  } else {
    return Seasons.Autumn;
  }
};

export const saveCityStorage = (city: string, coord: Coordinates) => {
  let cities: Array<JSONCities> = JSON.parse(
    localStorage.getItem("cities") as string
  );
  if (cities && !cities.some((item) => item.name === city)) {
    cities.push({ name: city, coords: coord });
  } else if (!cities) {
    cities = [{ name: city, coords: coord }];
  } else {
    cities = cities.filter((item) => item.name !== city);
  }
  localStorage.setItem("cities", JSON.stringify(cities));
};

export const isExistInStorage = (city: string) => {
  const cities: Array<JSONCities> = JSON.parse(
    localStorage.getItem("cities") as string
  );
  if (!cities) {
    return false;
  }
  return cities.some((item) => item.name === city);
};

export const getCitiesFromStorage = () => {
  const cities: Array<JSONCities> = JSON.parse(
    localStorage.getItem("cities") as string
  );
  return cities;
};

export const farToCelc = (far: number): number => {
  return Math.round((far - 32) / 1.8);
};

export const getForecastDays = (date: number) => {
  return format(new Date(date * 1000), "dd/MM");
};

export const getForecastIcon = (code: number): JSX.Element => {
  if ([26, 27, 28, 29, 30].includes(code)) {
    return Clouds;
  } else if ([32, 11, 12, 36].includes(code)) {
    return Sunny;
  } else if ([4, 5, 6, 7, 8, 9, 10].includes(code)) {
    return Rain;
  } else if ([5, 7, 13, 14, 15, 16, 41, 42, 43, 46].includes(code)) {
    return Snow;
  } else {
    return Sunny;
  }
};
export const saveSession = (city: string, data: RootObject) => {
  sessionStorage.setItem(city, JSON.stringify(data));
};

export const getDataFromSession = (city: string) => {
  return JSON.parse(sessionStorage.getItem(city) as string) ?? false;
};
