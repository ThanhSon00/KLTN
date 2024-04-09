import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.authMessageState || initialState;

export const selectAuthMessageState = createSelector(
  [selectSlice],
  state => state,
);
