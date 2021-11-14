import { createMuiTheme, ThemeOptions } from '@material-ui/core';
import { createSelector } from '@reduxjs/toolkit';
import { defaultThemeOptions, mustHaveThemeOptions } from '@breakingbad/configs/defaultThemeOptions';
import themesConfig from '@breakingbad/configs/themesConfig';
import { createSlice } from '@breakingbad/utils/Context';
import { merge } from 'lodash';
import { ThemeConfig, ThemeType } from '@breakingbad/types/Theme.type';
import { RootState } from '@breakingbad/utils/Context/Context';

export const initialState: ThemeType = {
  theme: 'defaultDark',
};

const getThemes = () => themesConfig;
const getMainThemeId = (state: RootState) => state.settings.theme;

function generateMuiTheme(themes: ThemeConfig, id: string) {
  const data: ThemeOptions = merge({}, defaultThemeOptions, themes[id], mustHaveThemeOptions);
	const response = createMuiTheme(data);
	return response;
}

export const selectMainTheme = createSelector([getThemes, getMainThemeId], (themes: ThemeConfig, id: string) =>
	generateMuiTheme(themes, id)
);

export const selectMainThemeDark = createSelector([getThemes], (themes: ThemeConfig) =>
	generateMuiTheme(themes, 'defaultDark')
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action) => {
      state.theme = action.payload;
    },
    resetSettings: (state) => {
      state = initialState;
    },
  },
});

export const { setSettings, resetSettings } = settingsSlice.actions;

export default settingsSlice.reducer;

