import {Seasons} from "./types/types";
import {format} from 'date-fns'
import {Clouds, Rain, Sunny} from "./components/icons";

const currentMonth = new Date().getMonth();

export const seasonBackground = (): Seasons => {

    if ([11, 0, 1].includes(currentMonth)) {
        return Seasons.Winter
    } else if ([2, 3, 4].includes(currentMonth)) {
        return Seasons.Spring
    } else if ([5, 6, 7].includes(currentMonth)) {
        return Seasons.Summer
    } else {
        return Seasons.Autumn
    }
}

export const farToCelc = (far: number): number => {
    return Math.round((far - 32) / 1.8)
}

export const getForecastDays = (date: number) => {
    return format(new Date(date * 1000), 'dd/MM');
}

export const getForecastIcon = (text: string): JSX.Element => {
    if (['Partly Cloudy', 'Cloudy'].includes(text)) {
        return Clouds
    } else if (['Sunny'].includes(text)) {
        return Sunny
    } else if (['Freezing Rain'].includes(text)) {
        return Rain
    } else {
        return Sunny
    }
}
