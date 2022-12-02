import * as React from 'react'
import {seasonBackground} from "../../utils";
import './Home.css'
import cn from 'classnames'
import WeatherContainer from "../WeatherContainer";
import {getWeather} from "../../axios";
import {RootObject} from "../../types/types";
import {Context} from "../context/context";

const Home: React.FC = () => {
    const [weather, setWeather] = React.useState<RootObject>();

    React.useEffect(() => {
        getWeather().then(value => setWeather(value))
    }, [])

    return (
        <Context.Provider value={weather as RootObject}>
            <div className={cn('wrapper', seasonBackground())}>
                <WeatherContainer/>
            </div>
        </Context.Provider>
    )
}

export default Home
