import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from 'store/configureStore';
import { Question } from 'app/components/QuestionDetails/slice/types';

export const createQuestion = createAsyncThunk<
  Question,
  {
    title: string;
    details: string;
    author: string;
  },
  {
    rejectValue: string;
    dispatch: AppDispatch;
  }
>('createQuestion', async (questionBody, thunkApi) => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/questions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(questionBody),
  });
  if (!response.ok) {
    return thunkApi.rejectWithValue('POST /v1/questions went wrong');
  }
  const question = await response.json();
  return question as Question;
});

export const updateQuestion = createAsyncThunk<
  Question,
  {
    id: string;
    title?: string;
    details?: string;
  },
  {
    rejectValue: string;
    dispatch: AppDispatch;
  }
>('createQuestion', async (questionBody, thunkApi) => {
  const { id } = questionBody;
  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/questions/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: questionBody.title, details: questionBody.details }),
  });
  if (!response.ok) {
    return thunkApi.rejectWithValue('PATCH /v1/questions/:id went wrong');
  }
  const question = await response.json();
  return question as Question;
});


export const getQuestion = async id => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/questions/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw Error('GET /v1/questions/:id went wrong');
  }
  const question = await response.json();
  return question as Question;
};

export const getQuestions = createAsyncThunk<
  Array<Question>,
  {
    amount: number;
  },
  {
    rejectValue: string;
    dispatch: AppDispatch;
  }
  >('getQuestions', async ({ amount }, thunkApi) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/questions?amount=${amount}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return thunkApi.rejectWithValue('GET /v1/questions went wrong');
    }
    const questions = await response.json();
    return questions as Array<Question>;
  });