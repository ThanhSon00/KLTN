import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.questions || initialState;

export const selectQuestions = createSelector([selectSlice], state => state);
