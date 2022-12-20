import * as React from "react";
import "../WeatherContainer/WeatherContainer.css";
import { useTranslation } from "react-i18next";

const ServerNotAvaible: React.FC = () => {
  const { t } = useTranslation("Translation");

  return (
    <div className="container" style={{ justifyContent: "center" }}>
      <span className="container__title">500</span>
      <h1 className="container__title"> {t("Not Available")}</h1>

      <a className={"button"} href="/">
        {t("Try again")}
      </a>
    </div>
  );
};

export default ServerNotAvaible;
