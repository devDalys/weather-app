import * as React from 'react'
import {seasonBackground} from "../../utils";
import './Home.css'
import cn from 'classnames'
import WeatherContainer from "../WeatherContainer";
import {getWeatherByCoordinates} from "../../axios";
import {RootObject} from "../../types/types";
import {Context} from "../../context/context";
import StartPage from "../StartPage";
import {CircularProgress} from "@mui/material";

const Home: React.FC = () => {
    const [weather, setWeather] = React.useState<RootObject>();
    const [coordinates, setCoordinates] = React.useState<any>()

    const onSuccess = (Props: GeolocationPosition) => {
        // широта и долгота
        const {latitude, longitude} = Props.coords

        setCoordinates({latitude, longitude})
    }

    const onError = (error: GeolocationPositionError) => {
        console.log(error)
    }

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, {
            enableHighAccuracy: true
        })
    }, [])


    React.useEffect(() => {
        !weather && coordinates?.latitude && getWeatherByCoordinates(coordinates).then(value => setWeather(value))
    }, [coordinates])

    if (!coordinates && !weather) {
        return (
            <div className='wrapper'>
                <StartPage changeState={setWeather}/>
            </div>
        )
    } else if (!weather) {
        return (
            <div className='wrapper'>
                <CircularProgress/>
            </div>
        )
    }

    return (
        <Context.Provider value={weather as RootObject}>
            <div className={cn('wrapper', seasonBackground())}>
                <WeatherContainer/>
            </div>
        </Context.Provider>
    )
}

export default Home
