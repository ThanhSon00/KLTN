import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import AuthState, { User } from './types';
import { login, logout, register, verifyEmail } from 'services/auth.service';
import { updateUser } from 'services/user.service';
import { Avatar } from 'app/components/ReportLine';

export const initialState: AuthState = {
  user: undefined,
  errorMessage: undefined,
  successMessage: undefined,
};

const setUser = (state, action: PayloadAction<User>) => {
  const user = action.payload;
  user.cover = user.cover ? `${process.env.REACT_APP_SERVER_ORIGIN}${user.cover}` : undefined;
  user.avatar = user.avatar ? `${process.env.REACT_APP_SERVER_ORIGIN}${user.avatar}` : Avatar.anonymous;
  state.user = action.payload;
}


const clearUser = state => {
  state.user = undefined;
}

const authSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    setUser: setUser,
    clearUser: clearUser,
    clearError: state => {
      state.errorMessage = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, setUser);
    builder.addCase(login.rejected, (state, action) => {
      state.errorMessage = "Emmail hoặc mật khẩu không đúng";
    });
    builder.addCase(register.rejected, (state, action) => {
      state.errorMessage = "Vui lòng kiểm tra lại thông tin đăng ký tài khoản";
    });
    builder.addCase(verifyEmail.fulfilled, (state, action) => {
      if (state.user) state.user.isEmailVerified = true;
    });
    builder.addCase(logout.fulfilled, clearUser);
    builder.addCase(register.fulfilled, setUser);
    builder.addCase(updateUser.fulfilled, setUser);
  },
});


export const { actions: authActions } = authSlice;

export const useSlice = () => {
  useInjectReducer({ key: authSlice.name, reducer: authSlice.reducer });
  useInjectSaga({ key: authSlice.name, saga: Saga });
  return { actions: authSlice.actions };
};

// Other code such as selectors can use the imported `RootState` type
export default authSlice.reducer;