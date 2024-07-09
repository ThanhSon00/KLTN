import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { panelSaga } from './saga';
import { PanelState, panelName } from './types';
import { login, register } from 'services/auth.service';
import { updateReportStatus } from 'services/report.service';

export const initialState: PanelState = {
  popUp: panelName.NONE,
};

const slice = createSlice({
  name: 'panelState',
  initialState,
  reducers: {
    openPanel: (state, action: PayloadAction<panelName>) => {
      state.popUp = action.payload;
    },
    closePanel: state => {
      state.popUp = panelName.NONE;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, state => {
      state.popUp = panelName.NONE;
    });
    builder.addCase(register.fulfilled, state => {
      state.popUp = panelName.NONE;
    });
    builder.addCase(updateReportStatus.fulfilled, state => {
      state.popUp = panelName.NONE;
    });
  },
});

export const { actions: panelActions } = slice;

export const usePanelSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: panelSaga });
  return { actions: slice.actions };
};

export default slice.reducer;
