import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import { AlertState } from './types';
import { getNewPassword, verifyEmail } from 'services/auth.service';
import { createAnswer } from 'services/answer.service';

export const initialState: AlertState = {
  warning: undefined,
  success: undefined,
  error: undefined,
};

const slice = createSlice({
  name: 'alertState',
  initialState,
  reducers: {
    setAlertMessage: (state, action: PayloadAction<AlertState>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: builder => {
    builder.addCase(getNewPassword.fulfilled, state => {
      state.success = 'Please check your email to get new account password';
    });
    builder.addCase(verifyEmail.fulfilled, state => {
      state.success = 'Your account has been successfully verified.';
    });
    builder.addCase(
      verifyEmail.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload;
      },
    );
    builder.addCase(createAnswer.fulfilled, (state, action) => {
      state.success = 'Your answer has been successfully submitted.';
    })
  },
});

export const { actions: AlertActions } = slice;

export const useSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: Saga });
  return { actions: slice.actions };
};

export default slice.reducer;
