import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from 'store/configureStore';
import { origin } from 'env';
import { Question } from 'app/components/QuestionDetails/slice/types';

export const createQuestion = createAsyncThunk<
  Question,
  {
    title: string;
    details: string;
    authorId: string;
  },
  {
    rejectValue: string;
    dispatch: AppDispatch;
  }
>('createQuestion', async (questionBody, thunkApi) => {
  const response = await fetch(`${origin}/v1/questions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(questionBody),
  });
  if (!response.ok) {
    return thunkApi.rejectWithValue('Something went wrong');
  }
  const question = await response.json();
  return question as Question;
});

export const getQuestion = async id => {
  const response = await fetch(`${origin}/v1/questions/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw Error('Something went wrong');
  }
  const question = await response.json();
  return question as Question;
};
