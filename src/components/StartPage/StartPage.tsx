import * as React from 'react'
import {arrowNext, happySmile} from "../icons";
import '../WeatherContainer/WeatherContainer.css'
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import './StartPage.css'
import {getWeatherByCity} from "../../axios";
import {RootObject} from "../../types/types";

interface Props {
    changeState: React.Dispatch<React.SetStateAction<RootObject | undefined>>
}

const StartPage: React.FC<Props> = React.memo(({changeState}) => {

    const [input, setInput] = React.useState<any>('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await getWeatherByCity(input).then(data => {
            changeState(data);
        })
    }

    return (
        <div className='container'>
            <h2 className='container__title' style={{textAlign: 'center'}}>Please allow me to take your coordinates
                to
                show the weather
                forecast {happySmile}</h2>
            <h2 className='container__title' style={{textAlign: 'center'}}>
                ...or enter your city here
            </h2>
            <form className='form' onSubmit={handleSubmit}>
                <TextField id="filled-basic" value={input} onChange={value => setInput(value.target.value)} label=""
                           variant="standard"
                />
                <Button type={'submit'} variant="text">{arrowNext}</Button>
            </form>

        </div>
    )
})

export default StartPage
