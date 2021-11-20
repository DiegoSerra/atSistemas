import {
  Action as RTKAction,
  createSlice as RTKCreateSlice,
  combineReducers as RTKCombineReducers,
  configureStore as RTKConfigureStore,
  ThunkDispatch,
} from '@reduxjs/toolkit';

import {
  useSelector as ReduxUseSelector,
  useDispatch as ReduxUseDispatch,
  Provider as ReduxProvider,
  TypedUseSelectorHook
} from 'react-redux';
import store from 'store';

export type Action = RTKAction;

export const createSlice = RTKCreateSlice;

export const combineReducers = RTKCombineReducers;

export const configureStore = RTKConfigureStore;

export const useSelector: TypedUseSelectorHook<RootState> = ReduxUseSelector;

export type RootState = ReturnType<typeof store.getState>;

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;

export const useDispatch = () => ReduxUseDispatch<ThunkAppDispatch>();

export const Provider = ReduxProvider;