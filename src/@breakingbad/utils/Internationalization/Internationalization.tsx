import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import Backend from 'i18next-http-backend';
import { Http } from '@breakingbad/services/Http';
import { dispatch } from "store";
import { i18nloaded } from "@breakingbad/context/language";
import { Languages, languageFromStorage, resources, getLocalI18n } from "./i18n";

export const availableLanguages = Object.keys(resources);
export { Languages, languageFromStorage, resources };

const backendOptions = {
  request: function (_: any, _url: string, __: any, callback: Function) {
    const data: any = getLocalI18n();
    callback(null, { status: 200, data: JSON.stringify(data) });
    dispatch(i18nloaded());
  },
};

const backInstance = i18n.createInstance();

const initConfig = {
  lng: languageFromStorage || Languages.default,
  whitelist: availableLanguages,
  fallbackLng: Languages.default, // use en if detected lng is not available
  interpolation: {
    escapeValue: false // react already safes from xss
  }
}

backInstance
  .use(detector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: backendOptions,
    ...initConfig
  });

Http.setDefaultHeader('Content-Language', languageFromStorage || Languages.default);

// Retrieve current language
export const currentLanguage = () => backInstance.language;
// Change language
export const changeLanguage = (lng: Languages) => { backInstance.changeLanguage(lng); };
// Retrieve key value according to current language
export const t = (key: string, options?: any) => backInstance.t(key, options);

export default backInstance;