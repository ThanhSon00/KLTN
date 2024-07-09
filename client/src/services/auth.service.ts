import { createAsyncThunk } from '@reduxjs/toolkit';
import { Admin } from 'app/components/AdminLogin/slice/types';
import { User } from 'app/components/SignInPanel/slice/types';
import { AppDispatch } from 'store/configureStore';

export const verifyEmail = createAsyncThunk<
  any,
  { token: string },
  {
    rejectValue: string;
    dispatch: AppDispatch;
  }
>('verifyEmail', async ({ token }, thunkApi) => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/auth/verify-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token,
    }),
  });
  if (!response.ok) {
    return thunkApi.rejectWithValue(
      'Email verification failed, please try again later',
    );
  }
});

export const forgotPassword = createAsyncThunk<
  any,
  {
    email: string;
  },
  {
    dispatch: AppDispatch;
    rejectValue: string;
  }
>('forgotPassword', async ({ email }, thunkApi) => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  });

  if (response.status === 404) {
    return thunkApi.rejectWithValue('Không tìm thấy Email');
  }
  if (response.status === 400) {
    return thunkApi.rejectWithValue('Email không hợp lệ');
  }
});

export const getNewPassword = createAsyncThunk<
  any,
  { token: string },
  { dispatch: AppDispatch }
>('getNewPassword', async ({ token }, thunkApi) => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/auth/new-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token,
    }),
  });
  if (response.status === 401) {
    const responseObj = await response.json();
    return thunkApi.rejectWithValue(responseObj.message);
  }
});

export const logout = createAsyncThunk<
  any,
  void,
  {
    dispatch: AppDispatch;
  }
>('logout', async (_, thunkApi) => {
  await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    mode: 'cors',
  });
});

export const adminLogout = createAsyncThunk<
  any,
  void,
  {
    rejectValue: string;
    dispatch: AppDispatch;
  }
>('logoutAdmin', async (_, thunkApi) => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v2/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    mode: 'cors',
  });
  if (!response.ok) {
    return thunkApi.rejectWithValue(
      'Log out failed, please try again later',
    );
  }
})

export const login = createAsyncThunk<
  User,
  { email: string; password: string },
  {
    dispatch: AppDispatch;
    rejectValue: string;
  }
>('login', async ({ email, password }, thunkApi) => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      email,
      password,
    }),
    mode: 'cors',
  });

  if (response.status === 400) {
    return thunkApi.rejectWithValue("Email hoặc mật khẩu không đúng");
  }

  const user = await response.json();
  return user as User;
});

export const adminLogin = createAsyncThunk<
  Admin,
  { name: string; password: string },
  {
    rejectValue: string;
    dispatch: AppDispatch;
  }
>('adminLogin', async ({ name, password }, thunkApi) => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v2/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      name,
      password,
    }),
  });

  if (response.status === 400) {
    return thunkApi.rejectWithValue("Email hoặc mật khẩu không đúng");
  }
  return await response.json() as Admin;
});

export const register = createAsyncThunk<
  User,
  {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
  },
  {
    rejectValue: string;
    dispatch: AppDispatch;
  }
>('register', async ({ email, password, name, confirmPassword }, thunkApi) => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      email,
      password,
      name,
      confirmPassword,
    }),
    mode: 'cors',
  });
  if (response.status === 400) {
    return thunkApi.rejectWithValue("Vui lòng kiểm tra lại thông tin đăng ký");
  }
  const user = await response.json();
  return user as User;
});
