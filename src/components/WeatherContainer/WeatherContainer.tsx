import * as React from 'react'
import './WeatherContainer.css'
import {RootObject} from "../../types/types";
import {Context} from "../../context/context";
import {farToCelc} from "../../utils";

const WeatherContainer: React.FC = () => {
    const context = React.useContext(Context) as RootObject;


    return (
        <div className='container'>
            <h2 className='container__title'>
                {context.location.city} / {context.location.country}
            </h2>
            <div className='container__temp'>
                <div className='container__temp-value'>
                    {farToCelc(context.current_observation.condition.temperature)}
                </div>
                <div className='container__temp-celc'>
                    c
                </div>
            </div>
            <div className='container__forecast'>
                {context.current_observation.condition.text}
            </div>
        </div>
    )
}

export default WeatherContainer
