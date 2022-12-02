import * as React from 'react'
import './WeatherContainer.css'

const WeatherContainer: React.FC = () => {
    return (
        <div className='container'>
            <h2 className='container__title'>
                Voronezh
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
