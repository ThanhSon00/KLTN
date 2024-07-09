import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectState = (state: RootState) => state.reportState || initialState;

export const selectReportState = createSelector(
  [selectState],
  state => state,
);
