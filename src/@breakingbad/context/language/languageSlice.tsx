import { createSlice } from '@breakingbad/utils/Context';
import { languageFromStorage, Languages } from '@breakingbad/utils/Internationalization/i18n';
import { LanguageType } from '@breakingbad/types/Language.type';

export const initialState: LanguageType = {
  settings: {
    language: languageFromStorage || Languages.default,
  },
  loadingI18n: false
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.settings.language = action.payload;
    },
    i18nloading: (state) => {
      state.loadingI18n = true;
    },
    i18nloaded: (state) => {
      state.loadingI18n = false;
    }
  },
});

export const { setLanguage, i18nloading, i18nloaded } = languageSlice.actions;

export default languageSlice.reducer;