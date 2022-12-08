import * as React from "react";
import "../WeatherContainer/WeatherContainer.css";
import {useTranslation} from "react-i18next";

const ServerNotAvaible: React.FC = () => {
    const {t} = useTranslation('translation')

    return (
        <div className="container" style={{justifyContent: 'center'}}>
            <span className="container__title">500</span>
            <h1 className="container__title"> {t('Not Available')}</h1>
        </div>
    );
};

export default ServerNotAvaible;
