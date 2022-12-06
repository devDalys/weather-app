import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";
import {Locale} from "./types/types";

i18n
    .use(Backend)
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: Locale.Russian,
        debug: false,
        detection:{
          caches: ['localStorage', 'cookie']
        },
        interpolation: {
            escapeValue: false
        }
    })
