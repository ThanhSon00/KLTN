import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.alertState || initialState;

export const select = createSelector([selectSlice], state => state);
