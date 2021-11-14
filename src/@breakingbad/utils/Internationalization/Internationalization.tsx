import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import { Http } from '@breakingbad/services/Http';
import { dispatch } from "store";
import { i18nloaded, i18nloading, setLanguage } from "@breakingbad/context/language";
import { Languages, languageFromStorage, resources } from "./i18n";

export const availableLanguages = Object.keys(resources);
export { Languages, languageFromStorage, resources };

const backInstance = i18n.createInstance();

const initConfig = {
  lng: languageFromStorage || Languages.default,
  whitelist: availableLanguages,
  fallbackLng: Languages.default, // use en if detected lng is not available
  interpolation: {
    escapeValue: false // react already safes from xss
  },
  debug: process.env.NODE_ENV === 'development',
  resources
}

backInstance
  .use(detector)
  .use(initReactI18next)
  .init({
    // backend: backendOptions,
    ...initConfig
  });

Http.setDefaultHeader('Content-Language', languageFromStorage || Languages.default);

// Retrieve current language
export const currentLanguage = () => backInstance.language;
// Change language
export const changeLanguage = (lng: Languages) => {
  dispatch(i18nloading());

  backInstance.changeLanguage(lng)
  .then(() => {
    dispatch(setLanguage(lng));
    dispatch(i18nloaded());
  })
};
// Retrieve key value according to current language
export const t = (key: string, options?: any) => backInstance.t(key, options);

export default backInstance;