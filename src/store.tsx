import { configureStore, combineReducers, Action } from '@breakingbad/utils/Context';
import { ThunkAction } from 'redux-thunk';
import language from '@breakingbad/context/language';
import settings from '@breakingbad/context/settings';
import characters from '@breakingbad/context/characters';
import character from '@breakingbad/context/character';
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';

const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] = [];

if (process.env.NODE_ENV === 'development') {
	const { createLogger } = require(`redux-logger`);
	const logger = createLogger({ collapsed: (_getState: any, _action: any, logEntry: any) => !logEntry.error });

	middlewares.push(logger);
}

const rootReducer = combineReducers({
  language,
  settings,
	characters,
	character
})

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false
		}).concat(middlewares),
	devTools: process.env.NODE_ENV === 'development'
});

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk = ThunkAction<void, RootState, null, Action>

export const { getState, dispatch } = store;

export default store;