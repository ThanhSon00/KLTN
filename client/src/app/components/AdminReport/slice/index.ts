import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { SolutionStatus } from './types';
import { updateReportStatus } from 'services/report.service';

export const initialState: SolutionStatus = {
  currentReport: undefined,
  statusToUpdate: undefined,
  updateReportState: undefined,
};

const slice = createSlice({
  name: 'solutionState',
  initialState,
  reducers: {
    setSolutionStatus: (state, action: PayloadAction<SolutionStatus>) => {
      return {...state,...action.payload };
    },
    clearSolutionStatus: state => {
      state.currentReport = undefined;
      state.statusToUpdate = undefined;
      state.updateReportState = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(updateReportStatus.fulfilled, (state, action) => {
      if (state.updateReportState) {
        state.updateReportState(action.payload);
        state.statusToUpdate = undefined;
        state.currentReport = undefined;
        state.updateReportState = undefined;
      }
    });
  }
});

export const { actions: SolutionActions } = slice;

export const useSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};

export default slice.reducer;