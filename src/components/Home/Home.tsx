import * as React from 'react'
import {seasonBackground} from "../../utils";
import './Home.css'
import cn from 'classnames'
import WeatherContainer from "../WeatherContainer";
import {getWeather} from "../../axios";
import {RootObject} from "../../types/types";

const Home: React.FC = () => {
    const [weather, setWeather] = React.useState<RootObject>();

    React.useEffect(() => {
        getWeather().then(value => setWeather(value))
    }, [])

    return (
        <div className={cn('wrapper', seasonBackground())}>
            <WeatherContainer/>
        </div>
    )
}

export default Home
