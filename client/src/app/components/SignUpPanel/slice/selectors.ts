import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.panelState || initialState;

export const selectPanelState = createSelector([selectSlice], state => state);
