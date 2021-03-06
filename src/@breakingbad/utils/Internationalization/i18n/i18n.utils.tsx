import lang from '../locales';

function getResources() {
  let _resources: any = {};
  for (let name in lang) {
    if (lang.hasOwnProperty(name)) {
      _resources[name] = { translation: Reflect.get(lang, name) };
    }
  }
  return _resources;
}

export const resources = getResources();

export enum Languages {
  ES = 'es',
  EN = 'en',
  default = 'en',
}

export const languageFromStorage = localStorage.getItem('i18nextLng') as Languages;