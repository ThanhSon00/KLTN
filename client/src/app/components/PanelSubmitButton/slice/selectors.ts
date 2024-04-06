import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.loadingIndicatorState || initialState;

export const selectLoadingIndicator = createSelector(
  [selectSlice],
  state => state,
);
