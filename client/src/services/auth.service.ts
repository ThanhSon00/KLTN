import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'app/components/SignInPanel/slice/types';
import { AppDispatch } from 'store/configureStore';
import { ResponseError } from 'utils/request';
import { origin } from 'env';

export const verifyEmail = createAsyncThunk<
  any,
  {
    token: string;
  },
  {
    rejectValue: string;
    dispatch: AppDispatch;
  }
>('verifyEmail', async ({ token }, thunkApi) => {
  const response = await fetch(`${origin}/v1/auth/verify-email`, {
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
  const response = await fetch(`${origin}/v1/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  });

  if (response.status === 404) {
    return thunkApi.rejectWithValue('Email not found');
  }
  if (response.status === 400) {
    return thunkApi.rejectWithValue('Email not valid');
  }
});

export const getNewPassword = createAsyncThunk<
  any,
  { token: string },
  { dispatch: AppDispatch }
>('getNewPassword', async ({ token }, thunkApi) => {
  const response = await fetch(`${origin}/v1/auth/new-password`, {
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
  unknown,
  {
    dispatch: AppDispatch;
  }
>('logout', async (_, thunkApi) => {
  await fetch(`${origin}/v1/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    mode: 'cors',
  });
});

export const login = createAsyncThunk<
  User,
  { email: string; password: string },
  {
    dispatch: AppDispatch;
    rejectValue: string;
  }
>('login', async ({ email, password }, thunkApi) => {
  const response = await fetch(`${origin}/v1/auth/login`, {
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
    const jsonResponse = (await response.json()) as ResponseError;
    return thunkApi.rejectWithValue(jsonResponse.message);
  }

  const user = await response.json();
  return user as User;
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
  const response = await fetch(`${origin}/v1/auth/register`, {
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
    const jsonResponse = (await response.json()) as ResponseError;
    return thunkApi.rejectWithValue(jsonResponse.message);
  }
  const user = await response.json();
  return user as User;
});
