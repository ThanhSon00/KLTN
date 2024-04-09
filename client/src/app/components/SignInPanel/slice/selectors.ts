// import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

export const getAuth = (state: RootState) => state.authState || initialState;

// export const select = createSelector([selectSlice], state => state);
