import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { ReportState } from './types';
import { createReport, ReportedType } from 'services/report.service';

export const initialState: ReportState = {
  reportedContentId: "",
  reportedType: ReportedType.none,
};

const setReportState = (state, action: PayloadAction<ReportState>) => {
  state.reportedContentId = action.payload.reportedContentId;
  state.reportedType = action.payload.reportedType;
}

const clearReportState = (state) => {
  state.reportedContentId = "";
  state.reportedType = ReportedType.none;
}

const slice = createSlice({
  name: 'reportState',
  initialState,
  reducers: {
    setReportState,
    clearReportState  
  },
});

export const { actions: ReportActions } = slice;

export const useSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};

export default slice.reducer;