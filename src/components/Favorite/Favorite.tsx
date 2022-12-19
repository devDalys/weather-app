import * as React from "react";
import { RootObject } from "../../types/types";
import remove from "../icons/remove.svg";
import favorite from "../icons/favorite.svg";

interface Props {
  isFavorite?: boolean;
}

const Favorite: React.FC<Props> = React.memo(({ isFavorite }) => {
  return (
    <>
      {!isFavorite ? (
        <>
          Сохранить в избранное <img src={remove} />
        </>
      ) : (
        <>
          В избранном
          <img src={favorite} />
        </>
      )}
    </>
  );
});

export default Favorite;
