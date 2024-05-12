import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "app/components/SignInPanel/slice/types";
import { AppDispatch } from "store/configureStore";

export interface Answer {
    id: string;
    questionId: string;
    details: AnswerDetails;
}

export interface AnswerDetails {
    author: User,
    id: string,
    voteCount: number,
    content: string,
    updatedAt: string,
    createdAt: string,
}

export const createAnswer = createAsyncThunk<
    Answer,
    {
        questionId: string;
        authorId: string;
        content: string;
    },
    {
        rejectValue: string;
        dispatch: AppDispatch;
    }
>('createAnswer', async (answerBody, thunkApi) => {
    const { authorId: author, content, questionId } = answerBody;
    const details = { author, content };

    const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/answers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionId, details }),
    });
    if (!response.ok) {
        return thunkApi.rejectWithValue('Something went wrong');
    }
    const answer = await response.json();
    return answer as Answer;
});

export const getAnswerDetails = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/answers/details/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        console.log('GET /v1/answers/details/:id went wrong');
    }

    return await response.json() as AnswerDetails;
}

export const updateAnswerDetail = createAsyncThunk<
    AnswerDetails,
    {
        id: string;
        content: string;
    },
    {
        rejectValue: string;
        dispatch: AppDispatch;
    }
>('updateAnswer', async (answerBody, thunkApi) => {
    const { id, content } = answerBody;

    const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/answers/details/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
    });
    if (!response.ok) {
        return thunkApi.rejectWithValue('PATCH /v1/answers/details/:id went wrong');
    }
    return await response.json() as AnswerDetails;
})