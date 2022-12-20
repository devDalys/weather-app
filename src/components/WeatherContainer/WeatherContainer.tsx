import * as React from "react";
import "./WeatherContainer.css";
import { RootObject, Paths } from "../../types/types";
import { Context } from "../../context/context";
import { farToCelc, isExistInStorage, saveCityStorage } from "../../utils";
import Forecast from "../Forecast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { settings } from "../icons";
import Favorite from "../Favorite/Favorite";
import Navbar from "../Navbar";

const WeatherContainer: React.FC = () => {
  const context = React.useContext(Context) as RootObject;
  const { t } = useTranslation("Forecast");
  const [isSettings, setSettings] = React.useState(false);
  const navigator = useNavigate();
  const [isFavorite, setIsFavorite] = React.useState(
    isExistInStorage(context.location.city)
  );

  const changeFavorite = () => {
    saveCityStorage(context.location.city, {
      latitude: context.location.lat,
      longitude: context.location.long,
    });
    setIsFavorite(isExistInStorage(context.location.city));
  };

  return (
    <div className="container">
      <Navbar setSettingsState={setSettings} settingState={isSettings} />
      {!isSettings && (
        <>
          <h2 className="container__title">
            {context.location.city} / {context.location.country}
          </h2>
          <h3 className="container__favorite" onClick={() => changeFavorite()}>
            <Favorite isFavorite={isFavorite} />
          </h3>
          <div className="container__temp">
            <div className="container__temp-value">
              {farToCelc(context.current_observation.condition.temperature)}
            </div>
            <div className="container__temp-celc">c</div>
          </div>
          <div className="container__forecast">
            {t(context.current_observation.condition.text.toLowerCase())}
          </div>
          <Forecast forecast={context.forecasts} />
        </>
      )}
    </div>
  );
};

export default WeatherContainer;
