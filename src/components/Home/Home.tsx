import * as React from 'react'
import {seasonBackground} from "../../utils";
import './Home.css'
import cn from 'classnames'
import WeatherContainer from "../WeatherContainer";

const Home: React.FC = () => {


    return (
        <div className={cn('wrapper', seasonBackground())}>
            <WeatherContainer />
        </div>
    )
}

export default Home
