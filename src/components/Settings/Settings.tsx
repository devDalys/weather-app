import * as React from "react";
import css from "./Settings.module.css";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../types/types";
import { LegacyRef } from "react";
const Settings: React.FC = () => {
  const navigate = useNavigate();
  const clearRef = React.useRef<HTMLButtonElement | null>(null);
  const clearAll = () => {
    localStorage.clear();
    sessionStorage.clear();

      if(clearRef.current){
          clearRef.current.classList.add(css.animation)
          setTimeout(() => {
              clearRef.current?.classList.remove(css.animation)
          },1500)
      }
  };

  return (
    <>
      <h2 className={css.title}>Настройки</h2>

      <button onClick={() => navigate(Paths.Start)} className={css.button}>
        Редактировать города
      </button>
      <button ref={clearRef} className={css.button} onClick={() => clearAll()}>
        Очистить все данные
      </button>
      <button className={css.button}>Фон другого сезона</button>
      <a
        href={"https://github.com/devDalys/weather-app"}
        target={"_blank"}
        className={css.button}
      >
        Ссылка на GitHub
      </a>
      <a
        href={"http://devdalys.netlify.app"}
        target={"_blank"}
        className={css.button}
      >
        Об авторе
      </a>
    </>
  );
};

export default Settings;
