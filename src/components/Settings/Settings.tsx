import * as React from "react";
import css from "./Settings.module.css";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../types/types";
import { LegacyRef } from "react";
import { useTranslation } from "react-i18next";
const Settings: React.FC = () => {
  const navigate = useNavigate();
  const clearRef = React.useRef<HTMLButtonElement | null>(null);
  const { t } = useTranslation("Translation");
  const clearAll = () => {
    localStorage.clear();
    sessionStorage.clear();

    if (clearRef.current) {
      clearRef.current.classList.add(css.animation);
      setTimeout(() => {
        clearRef.current?.classList.remove(css.animation);
      }, 1500);
    }
  };

  return (
    <>
      <h2 className={css.title}>{t("Settings")}</h2>

      <button onClick={() => navigate(Paths.Start)} className={css.button}>
        {t("Change cities")}
      </button>
      <button ref={clearRef} className={css.button} onClick={() => clearAll()}>
        {t("Clear data")}
      </button>
      <button className={css.button}>{t("Change background")}</button>
      <a
        href={"https://github.com/devDalys/weather-app"}
        target={"_blank"}
        className={css.button}
      >
        {t("Link GitHub")}
      </a>
      <a
        href={"http://devdalys.netlify.app"}
        target={"_blank"}
        className={css.button}
      >
        {t("About")}
      </a>
    </>
  );
};

export default Settings;
