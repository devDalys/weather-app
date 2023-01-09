import * as React from "react";
import { useQuery } from "react-query";
import { getTranslate } from "../../axios";
import css from "./TranslateComponent.module.css";
import { Skeleton } from "@mui/material";
import i18n from "i18next";

interface Props {
  text: string;
}

const TranslateComponent: React.FC<Props> = React.memo(({ text }) => {
  const [translate, setTranslate] = React.useState("");
  const [isRussian, setIsRussian] = React.useState<boolean>();
  React.useEffect(() => {
    i18n.language === "ru-RU" ? setIsRussian(true) : setIsRussian(false);
    if (!isRussian) {
      setTranslate(text);
    }
  }, [isRussian]);

  const { isLoading } = useQuery(
      "query-getCityTranslate",
      () => {
        getTranslate(text)
            .then((res) => {
              setTranslate(res.translated_text);
            })
            .catch((err) => setTranslate(text));
      },
      { enabled: !translate && !isRussian }
  );

  if (!translate || isLoading) {
    return <Skeleton className={css.loading} />;
  }

  return <div className={css.translated__text}>{translate}</div>;
})

export default TranslateComponent;
