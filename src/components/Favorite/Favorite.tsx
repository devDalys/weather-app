import * as React from "react";
import { noFavorite, Favorite as FavoriteIcon } from "../icons";

interface Props {
  isFavorite?: boolean;
}

const Favorite: React.FC<Props> = React.memo(({ isFavorite }) => {
  return (
    <>
      {!isFavorite ? (
        <>Сохранить в избранное {noFavorite}</>
      ) : (
        <>
          В избранном
          {FavoriteIcon}
        </>
      )}
    </>
  );
});

export default Favorite;
