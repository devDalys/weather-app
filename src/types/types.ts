export interface context {

}

export enum Seasons {
    Summer = 'summer',
    Autumn = 'autumn',
    Winter = 'winter',
    Spring = 'spring'
}

export interface RootObject {
    location: Location;
    current_observation: Currentobservation;
    forecasts: Forecast[];
}

interface Forecast {
    day: string;
    date: number;
    low: number;
    high: number;
    text: string;
    code: number;
}

interface Currentobservation {
    wind: Wind;
    atmosphere: Atmosphere;
    astronomy: Astronomy;
    condition: Condition;
    pubDate: number;
}

interface Condition {
    code: number;
    text: string;
    temperature: number;
}

interface Astronomy {
    sunrise: string;
    sunset: string;
}

interface Atmosphere {
    humidity: number;
    visibility: number;
    pressure: number;
    rising: number;
}

interface Wind {
    chill: number;
    direction: number;
    speed: number;
}

interface Location {
    city: string;
    region: string;
    woeid: number;
    country: string;
    lat: number;
    long: number;
    timezone_id: string;
}
