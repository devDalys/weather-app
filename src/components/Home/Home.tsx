import * as React from "react";
import { seasonBackground } from "../../utils";
import "./Home.css";
import cn from "classnames";
import WeatherContainer from "../WeatherContainer";
import { getWeatherByCoordinates } from "../../axios";
import { Coordinates, RootObject } from "../../types/types";
import { Context } from "../../context/context";
import StartPage from "../StartPage";
import { CircularProgress } from "@mui/material";
import { AxiosError } from "axios";
import "../../i18n";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "../PageNotFound";

const Home: React.FC = () => {
  const [weather, setWeather] = React.useState<RootObject>();
  const [coordinates, setCoordinates] = React.useState<Coordinates>();
  const [error, setError] = React.useState<AxiosError>();
  const [permission, setPermissions] = React.useState<PermissionStatus>();

  const onSuccess = (Props: GeolocationPosition) => {
    const { latitude, longitude } = Props.coords;

    setCoordinates({ latitude, longitude });
  };
  const onError = (error: GeolocationPositionError) => {
    console.log(error);
  };

  React.useEffect(() => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((data) => setPermissions(data));
  });

  React.useLayoutEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, []);

  React.useEffect(() => {
    !weather &&
      coordinates?.latitude &&
      getWeatherByCoordinates(coordinates)
        .then((value) => setWeather(value))
        .catch((err) => setError(err));
  }, [coordinates, weather]);

  if ((!coordinates && !weather && !!permission) || error) {
    return (
      <div className="wrapper">
        <StartPage changeState={setWeather} />
      </div>
    );
  } else if (!weather) {
    return (
      <div className="wrapper">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Context.Provider value={weather as RootObject}>
      <div className={cn("wrapper", seasonBackground())}>
        <Routes>
          <Route path={"/"} element={<WeatherContainer />} />
          <Route path={"*"} element={<PageNotFound />} />
        </Routes>
      </div>
    </Context.Provider>
  );
};

export default Home;
