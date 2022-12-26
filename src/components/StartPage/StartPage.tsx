import * as React from "react";
import { goBack, happySmile } from "../icons";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress } from "@mui/material";
import "./StartPage.css";
import { getWeatherByCity } from "../../axios";
import { Paths, RootObject } from "../../types/types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  getCitiesFromStorage,
  isExistInStorage,
  saveCityStorage,
} from "../../utils";
import SavedCities from "../SavedCities";

interface Props {
  changeState: React.Dispatch<React.SetStateAction<RootObject | undefined>>;
}

const StartPage: React.FC<Props> = React.memo(({ changeState }) => {
  const [input, setInput] = React.useState<any>("");
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await getWeatherByCity(input)
      .then((data) => {
        changeState(data);
        setIsLoading(false);
      })
      .catch(() => navigation(Paths.Error));
  };
  const getWeatherByName = async (city: string) => {
    setIsLoading(true);
    await getWeatherByCity(city)
      .then((data) => {
        !isExistInStorage(data.location.city) &&
          saveCityStorage(data.location.city, {
            latitude: data.location.lat,
            longitude: data.location.long,
          });
        changeState(data);
        setIsLoading(false);
      })
      .catch(() => navigation(Paths.Error));
  };

  const cities = React.useMemo(() => {
    return getCitiesFromStorage();
  }, [isLoading]);

  const { t } = useTranslation("Translation");

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className="start__page">
      {!cities ? (
        <>
          <h2 className="start__page_title" style={{ textAlign: "center" }}>
            {t(
              "Please allow me to take your coordinates to show the weather forecast"
            )}{" "}
            {happySmile}
          </h2>
          <h2 className="start__page_title" style={{ textAlign: "center" }}>
            ...{t("or enter your city here")}
          </h2>
          <form className="form" onSubmit={handleSubmit}>
            <TextField
              id="filled-basic"
              value={input}
              onChange={(value) => setInput(value.target.value)}
              label=""
              variant="standard"
            />
            <Button type={"submit"} variant="text">
              {goBack}
            </Button>
          </form>
        </>
      ) : (
        <SavedCities
          cities={cities}
          showTitle
          canBeAdded
          onClick={getWeatherByName}
        />
      )}
    </div>
  );
});

export default StartPage;
