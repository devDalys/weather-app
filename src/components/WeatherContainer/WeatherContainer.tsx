import * as React from "react";
import "./WeatherContainer.css";
import { RootObject } from "../../types/types";
import { Context } from "../../context/context";
import { farToCelc } from "../../utils";
import Forecast from "../Forecast";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { settings } from "../icons";

const WeatherContainer: React.FC = () => {
  const context = React.useContext(Context) as RootObject;
  const { t } = useTranslation("Forecast");
  const [isSettings, setSettings] = React.useState(false);
  const navigator = useNavigate();

  return (
    <div className="container">
      <div className="settings" onClick={() => setSettings(!isSettings)} />
      <div
        className="back"
        onClick={() =>
          isSettings ? setSettings(!settings) : navigator("/start")
        }
      />
      {!isSettings && (
        <>
          <h2 className="container__title">
            {context.location.city} / {context.location.country}
          </h2>
          <h3 className="container__region">
            {context.location.region}
            <br /> {format(new Date(), "dd.MM.yyy HH:mm")}
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
