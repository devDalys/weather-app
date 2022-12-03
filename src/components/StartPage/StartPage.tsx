import * as React from 'react'
import {happySmile} from "../icons";
import '../WeatherContainer/WeatherContainer.css'

const StartPage: React.FC = () => {
    return (
        <div className='container'>
            <h2 className='container__title'>Please allow me to take your coordinates to show the weather
                forecast {happySmile}</h2>
        </div>
    )
}

export default StartPage
