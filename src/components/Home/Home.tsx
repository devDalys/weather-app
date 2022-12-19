import * as React from "react";
import {seasonBackground} from "../../utils";
import "./Home.css";
import cn from "classnames";
import WeatherContainer from "../WeatherContainer";
import {getWeatherByCoordinates} from "../../axios";
import {Coordinates, RootObject} from "../../types/types";
import {Context} from "../../context/context";
import StartPage from "../StartPage";
import {CircularProgress} from "@mui/material";
import "../../i18n";
import {Route, Routes, useNavigate} from "react-router-dom";
import PageNotFound from "../PageNotFound";
import ServerIsNotAvaible from "../ServerIsNotAvaible";
import {useQuery} from "react-query";

const Home: React.FC = React.memo(() => {
  const [weather, setWeather] = React.useState<RootObject>();
  const [coordinates, setCoordinates] = React.useState<Coordinates>();
  const [permission, setPermissions] = React.useState<PermissionStatus>();

  const onSuccess = (Props: GeolocationPosition) => {
    const { latitude, longitude } = Props.coords;

    setCoordinates({ latitude, longitude });
  };
  const onError = (error: GeolocationPositionError) => {
    console.log(error);
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
    if (!coordinates && !weather) {
      navigation("/start");
    } else if (weather?.forecasts) {
      navigation("/forecast");
    }
  }, [coordinates, weather]);

  if ((!weather && !permission) || isLoading) {
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
          <Route path={"/forecast"} element={<WeatherContainer />} />
          <Route path={"/500"} element={<ServerIsNotAvaible />} />
          <Route path={"*"} element={<PageNotFound />} />
          <Route
            path={"/start"}
            element={<StartPage changeState={setWeather} />}
          />
        </Routes>
      </div>
    </Context.Provider>
  );
});

export default Home;
