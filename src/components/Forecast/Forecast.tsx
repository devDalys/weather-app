import * as React from 'react'
import {Forecast as ForeCastProps} from '../../types/types'
import {farToCelc, getForecastDays, getForecastIcon} from "../../utils";
import './Forecast.css'
import {Clouds, Sunny} from "../icons";

interface Props {
    forecast: ForeCastProps[];
}

const Forecast: React.FC<Props> = ({forecast}) => {
    return (
        <div className='forecast'>
            {forecast.slice(0, 5).map(cast => {
                return (
                    <div className='forecast__item'>
                        <span className='forecast__item_date'>{getForecastDays(cast.date)}</span>
                        <span className='forecast__item_day'>{cast.day}</span>
                        <span className='forecast__item_day'>{getForecastIcon(cast.code)}</span>
                        <span
                            className='forecast__item_cast'>
                            <span>{farToCelc((cast.high))}</span>
                            /
                            <span>{farToCelc((cast.low))}</span>
                        </span>

                    </div>
                )
            })}
        </div>
    )
}

export default Forecast
