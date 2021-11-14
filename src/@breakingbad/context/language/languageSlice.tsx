import { createSlice } from '@breakingbad/utils/Context';
import { changeLanguage } from '@breakingbad/utils/Internationalization';
import { Languages } from '@breakingbad/utils/Internationalization/i18n';
import { LanguageType } from '@breakingbad/types/Language.type';

export const initialState: LanguageType = {
  settings: {
    language: Languages.default,
  },
  loadingI18n: true
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.settings.language = action.payload;
    },
    toggleLanguage: (state) => {
      if (state.settings.language === Languages.EN) {
        state.settings.language = Languages.ES;
        changeLanguage(Languages.ES);
      } else {
        state.settings.language = Languages.EN;
        changeLanguage(Languages.EN);
      }
    },
    i18nloaded: (state) => {
      state.loadingI18n = false;
    }
  },
});

export const { setLanguage, toggleLanguage, i18nloaded } = languageSlice.actions;

export default languageSlice.reducer;