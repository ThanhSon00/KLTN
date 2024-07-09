import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'app/components/SignInPanel/slice/types';
import { AppDispatch } from 'store/configureStore';
import queryString from 'query-string';

interface UserBody {
  coverFile?: File;
  avatarFile?: File;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const getUser = async id => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw Error('Something went wrong');
  }
  const user = await response.json();
  return user as User;
};

export const updateUser = createAsyncThunk<
  User,
  { id: string; userBody: UserBody },
  { dispatch: AppDispatch,  rejectValue: string }
>('updateUser', async ({ id, userBody }, { dispatch, rejectWithValue }) => {
  const formData = new FormData();

  for (const key in userBody) {
    formData.append(key, userBody[key]);
  }

  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/users/${id}`, {
    method: 'PATCH',
    body: formData, 
  })

  if (!response.ok) {
    return rejectWithValue('PATCH /v1/users/:id went wrong');
  }
  const user = await response.json();
  
  return user as User;
})

export const getUsers = async (queryOptions: { limit: number, page: number, sortDesc?: string, paginate?: boolean }): Promise<(User | { hasMore: boolean })[]> => {
  const { paginate, ...query } = queryOptions;
  const stringifiedQuery = queryString.stringify(query);
  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/users?${stringifiedQuery}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors', // to allow cross-origin requests
  });
  if (response.ok) {
    const users = await response.json();
    if (!paginate) {
      users.pop();
    }
    return users;
  } else throw Error('GET /v1/users went wrong');
}

export const searchUsers = async (queryOptions: { info: string, limit: number, page: number }): Promise<{ users: (User | { hasMore: boolean })[], usersCount: number }> => {
  const stringifiedQuery = queryString.stringify(queryOptions);
  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/users/search?${stringifiedQuery}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const result = await response.json() as { users: User[], usersCount: number };
    return result;
  } else throw Error('GET /v1/users went wrong');
}

export const banUser = async (userId: string, isBanned: string): Promise<User> => {
  const formData = new FormData();
  formData.append('isBanned', isBanned);
  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/users/${userId}`, {
    method: 'PATCH',
    body: formData,
  });

  if (!response.ok) {
    throw Error('PATCH /v1/users/:id went wrong');
  }
  const user = await response.json();
  return user as User;
}