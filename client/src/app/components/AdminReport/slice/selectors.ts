import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.solutionState || initialState;

export const selectSolution = createSelector(
  [selectSlice],
  state => state,
);
