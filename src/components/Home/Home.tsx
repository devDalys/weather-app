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
import { useNavigate } from "react-router-dom";
import ServerIsNotAvaible from "../ServerIsNotAvaible";
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

  const navigation = useNavigate();

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
        .then((value) => {
          if (value.forecasts) {
            setWeather(value);
          } else {
            throw Error("Server is not available");
          }
        })
          .catch((err) => {
            setError(err);
            navigation("/500");
          });
  }, [coordinates, weather]);

  React.useEffect(() => {
    if (!coordinates && !weather) {
      navigation("/start");
    } else if (weather) {
      navigation('/forecast')
    }
  }, [coordinates, weather])

  if (!weather && !error && !permission) {
    return (
        <div className="wrapper">
          <CircularProgress/>
        </div>
    );
  }


  return (
      <Context.Provider value={weather as RootObject}>
        <div className={cn("wrapper", seasonBackground())}>
          <Routes>
            <Route path={"/forecast"} element={<WeatherContainer/>}/>
            <Route path={"/500"} element={<ServerIsNotAvaible/>}/>
            <Route path={"*"} element={<PageNotFound/>}/>
            <Route
                path={"/start"}
                element={<StartPage changeState={setWeather}/>}
            />
          </Routes>
        </div>
      </Context.Provider>
  );
};

export default Home;
