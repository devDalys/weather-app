import * as React from "react";
import { JSONCities } from "../../types/types";
import css from "./SavedCities.module.css";
import cn from "classnames";

interface Props {
  cities: Array<JSONCities>;
  onClick?: (city: string) => Promise<void>;
  showTitle?: boolean;
  canBeAdded?: boolean;
}

const SavedCities: React.FC<Props> = React.memo(
  ({ cities, onClick, showTitle, canBeAdded }) => {
    const [inputState, setInputState] = React.useState("");
    const [inputError, setInputError] = React.useState(false);
    const handleSumbit = () => {
      !inputError && onClick?.(inputState);
    };
    React.useEffect(() => {
      if (
        !!inputState.length &&
        cities.some((city) =>
          city.name.replace(/ /g, "").startsWith(inputState)
        )
      ) {
        setInputError(true);
      } else {
        setInputError(false);
      }
    }, [inputState]);

    return (
      <div className={css.wrapper}>
        {showTitle && (
          <h2 className={css.wrapper__title}>Ваши сохраненные города: </h2>
        )}

        {cities.map((city) => (
          <div
            className={css.wrapper__item}
            key={city.name}
            onClick={() => {
              onClick?.(city.name);
            }}
          >
            {city.name}
          </div>
        ))}
        {canBeAdded && (
          <form
            className={css.form}
            onSubmit={(e) => {
              e.preventDefault();
              handleSumbit();
            }}
          >
            <input
              value={inputState}
              onChange={(e) => setInputState(e.target.value)}
              className={cn(css.input, { [css.input__error]: inputError })}
              placeholder={"Добавить новый город..."}
            />
            <span
              className={cn(css.input_error_hidden, {
                [css.input__error_text]: inputError,
              })}
            >
              Город есть в списке
            </span>
          </form>
        )}
      </div>
    );
  }
);

export default SavedCities;
