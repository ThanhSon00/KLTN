import queryString from 'query-string';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from 'store/configureStore';
import { Question } from 'app/components/QuestionDetails/slice/types';
import { Statics } from 'app/pages/AdminDashBoard';
import { SortCategory } from 'app/components/InitialSection';

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
    credentials: 'include',
  });
  if (!response.ok) {
    throw Error('GET /v1/questions/:id went wrong');
  }
  const question = await response.json();
  return question as Question;
};

export const getQuestions = createAsyncThunk<
    Array<Question | { hasMore: boolean }>,
  {
    amount: number;
    sortDesc?: SortCategory;
    page: number;
    pagination?: boolean;
  },
  {
    rejectValue: string;
    dispatch: AppDispatch;
  }
  >('getQuestions', async (query, thunkApi) => {
    const { pagination, ...queryOptions } = query;
    const stringifiedQuery = queryString.stringify(queryOptions);
    const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/questions?${stringifiedQuery}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return thunkApi.rejectWithValue('GET /v1/questions went wrong');
    }
    const questions = await response.json() as Array<Question | { hasMore: boolean }>;
    if (!pagination) {
      questions.pop();
    }    
    return questions as Array<Question>  
  });

export const getUserQuestions = async (userId: string, queryOptions?: { amount: number, page: number, answersCount?: number }) => {
  const stringifiedQuery = queryString.stringify({...queryOptions });
  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/users/${userId}/questions?${stringifiedQuery}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  });
  return await response.json() as (Question | { hasMore: true })[];
}

export const countUserQuestions = async (userId: string) => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/users/${userId}/questions/count`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  });
  return await response.json() as number;
}

export const getStatics = async (): Promise<Statics> => {
  const questionCountRes = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/questions/count`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  });

  const answerCountRes = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/answers/count`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const userCountRes = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/users/count`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const percentageRes = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/questions/answered-percentage`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  const questionsCount = await questionCountRes.json() as number;
  const answersCount = await answerCountRes.json() as number;
  const usersCount = await userCountRes.json() as number;
  const answeredPercentage = await percentageRes.json() as number;

  return {
    questionsCount,
    answersCount,
    usersCount,
    answeredPercentage
  }
}