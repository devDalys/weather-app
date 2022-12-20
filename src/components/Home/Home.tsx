import * as React from "react";
import { seasonBackground } from "../../utils";
import "./Home.css";
import cn from "classnames";
import WeatherContainer from "../WeatherContainer";
import { getWeatherByCoordinates } from "../../axios";
import { Coordinates, Paths, RootObject } from "../../types/types";
import { Context } from "../../context/context";
import StartPage from "../StartPage";
import { CircularProgress } from "@mui/material";
import "../../i18n";
import { Route, Routes, useNavigate } from "react-router-dom";
import PageNotFound from "../PageNotFound";
import ServerIsNotAvaible from "../ServerIsNotAvaible";
import { useQuery } from "react-query";

const Home: React.FC = React.memo(() => {
  const [weather, setWeather] = React.useState<RootObject>();
  const [coordinates, setCoordinates] = React.useState<Coordinates>();
  const [permission, setPermissions] = React.useState<PermissionStatus>();
  const [permissionError, setPermissionError] =
    React.useState<GeolocationPositionError>();
  const onSuccess = (Props: GeolocationPosition) => {
    const { latitude, longitude } = Props.coords;

    setCoordinates({ latitude, longitude });
  };
  const onError = (error: GeolocationPositionError) => {
    setPermissionError(error);
  };

  const navigation = useNavigate();

  React.useEffect(() => {
    !permission &&
      navigator.permissions
        .query({ name: "geolocation" })
        .then((data) => setPermissions(data));
  }, [permission]);

  React.useLayoutEffect(() => {
    !coordinates &&
      navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true,
      });
  }, []);
  const { isLoading, data: WeatherResponse } = useQuery(
    "query-RootObject",
    () => {
      return getWeatherByCoordinates(coordinates as Coordinates);
    },
    {
      enabled: !weather && !!coordinates,
    }
  );

  React.useEffect(() => {
    if (WeatherResponse) {
      setWeather(WeatherResponse);
    }
  }, [WeatherResponse]);

  React.useEffect(() => {
    if (
      (!weather && !coordinates && !permission) ||
      (permissionError && !weather)
    ) {
      navigation(Paths.Start);
    } else if (weather?.forecasts) {
      navigation(Paths.Forecast);
    }
  }, [coordinates, weather, permission, permissionError]);

  if (
    (!weather && !permission && !coordinates) ||
    isLoading ||
    (!weather && permission?.state === "granted")
  ) {
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
          <Route path={Paths.Forecast} element={<WeatherContainer />} />
          <Route path={Paths.Error} element={<ServerIsNotAvaible />} />
          <Route path={Paths.Invalid} element={<PageNotFound />} />
          <Route
            path={Paths.Start}
            element={<StartPage changeState={setWeather} />}
          />
        </Routes>
      </div>
    </Context.Provider>
  );
});

export default Home;
