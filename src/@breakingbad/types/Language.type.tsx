import { Languages } from '@breakingbad/utils/Internationalization';

export interface LanguageType {
  settings: {
    language: Languages,
  },
  loadingI18n: boolean
}
