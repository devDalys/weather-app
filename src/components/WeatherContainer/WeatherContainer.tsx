import * as React from 'react'
import './WeatherContainer.css'
import {RootObject} from "../../types/types";
import {Context} from "../../context/context";

const WeatherContainer: React.FC = () => {
    const context = React.useContext(Context) as RootObject;


    return (
        <div className='container'>
            <h2 className='container__title'>
                {context.location.city}
            </h2>
            <div className='container__temp'>
                <div className='container__temp-value'>
                    25
                </div>
                <div className='container__temp-celc'>
                    c
                </div>
            </div>
            <div className='container__forecast'>
                Mostly Cloudy / Rain Showers
            </div>
        </div>
    )
}

export default WeatherContainer
