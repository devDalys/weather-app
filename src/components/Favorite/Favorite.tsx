import * as React from "react";
import { noFavorite, Favorite as FavoriteIcon } from "../icons";
import { useTranslation } from "react-i18next";

interface Props {
  isFavorite?: boolean;
}

const Favorite: React.FC<Props> = React.memo(({ isFavorite }) => {
  const { t } = useTranslation("Translation");

  return (
    <>
      {!isFavorite ? (
        <>
          {t("noFavorites")} {noFavorite}
        </>
      ) : (
        <>
          {t("inFavorite")}
          {FavoriteIcon}
        </>
      )}
    </>
  );
});

export default Favorite;
