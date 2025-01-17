import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import { AuthMessageState } from './types';
import { forgotPassword, login, register } from 'services/auth.service';
import { updateUser } from 'services/user.service';

export const initialState: AuthMessageState = {
  error: undefined,
  success: undefined,
};

const slice = createSlice({
  name: 'authMessageState',
  initialState,
  reducers: {
    setAuthMessage: (state, action: PayloadAction<AuthMessageState>) => {
      return { ...state, ...action.payload };
    },
    clearAllMessage: state => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(forgotPassword.fulfilled, state => {
      state.success = 'Vui lòng kiểm tra mail của bạn';
    });
    builder.addCase(
      forgotPassword.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload;
      },
    );
    builder.addCase(
      register.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload;
      },
    );
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.success = 'Dữ liệu đã được cập nhật';
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
