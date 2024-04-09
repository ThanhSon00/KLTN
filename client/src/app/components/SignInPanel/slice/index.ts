import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import AuthState, { User } from './types';
import { login, logout, register, verifyEmail } from 'services/auth.service';

export const initialState: AuthState = {
  user: undefined,
  errorMessage: undefined,
  successMessage: undefined,
};

const authSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = undefined;
    },
    clearError: state => {
      state.errorMessage = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.errorMessage = action.payload;
    });
    builder.addCase(logout.fulfilled, state => {
      state.user = undefined;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.errorMessage = action.payload;
    });
    builder.addCase(verifyEmail.fulfilled, (state, action) => {
      if (state.user) {
        state.user.isEmailVerified = true;
      }
    });
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
