import * as React from "react";
import "../WeatherContainer/WeatherContainer.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
  const { t } = useTranslation("Translation");

  return (
    <div className="container" style={{ justifyContent: "center" }}>
      <span className="container__title">404</span>
      <h1 className="container__title"> {t("Page not found")}</h1>
      <Link to={"/"}>
        <a className="button">На главную</a>
      </Link>
    </div>
  );
};

export default PageNotFound;
