import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "app/components/SignInPanel/slice/types";
import queryString from "query-string";
import { AppDispatch } from "store/configureStore";
import { Vote } from "./vote.service";

export interface Answer {
    id: string;
    questionId: string;
    details: AnswerDetails;
    comments: Comment[];
    commentsAmount: number;
    voteStatus?: Vote;
}

export interface Comment {
    id: string;
    answerId: string;
    details: AnswerDetails;
    voteStatus?: Vote;
}

export interface AnswerDetails {
    author: User,
    id: string,
    votes: number,
    content: string,
    updatedAt: string,
    createdAt: string,
    isBestAnswer: boolean;
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

export const getAnswer = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/answers/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        console.log('GET /v1/answers/:id went wrong');
    }

    return await response.json() as Answer;
}

export const updateAnswer = createAsyncThunk<
    Answer,
    {
        id: string;
        content?: string;
        isBestAnswer?: boolean;
    },
    {
        rejectValue: string;
        dispatch: AppDispatch;
    }
>('updateAnswer', async (answerBody, thunkApi) => {
    const { id, ...answerDetailsBody } = answerBody;

    const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/answers/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            details: {
                content: answerDetailsBody.content,
                isBestAnswer: answerDetailsBody.isBestAnswer,
            }
        }),
    });
    if (!response.ok) {
        return thunkApi.rejectWithValue('PATCH /v1/answers/:id went wrong');
    }
    return await response.json() as Answer;
})

export const getUserAnswers = createAsyncThunk<
    (Answer | { hasMore: boolean })[],
    {
        userId: string;
        page: number;
        pagination?: boolean;
    },
    {
        rejectValue: string;
        dispatch: AppDispatch;
    }
>('getUserAnswers', async ({ userId, page, pagination }, thunkApi) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/users/${userId}/answers?amount=5&page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        return thunkApi.rejectWithValue('GET /v1/users/:id/answers went wrong');
    }
    const answers = await response.json() as Answer[];
    if (!pagination) {
        answers.pop();
    }
    return answers;
})

export const countUserAnswers = async (userId: string) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/users/${userId}/answers/count`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json() as number;
}

export const getAnswers = async (filterOptions: { questionId?: string, author?: string, amount: number, page: number, sortDesc?: string }, pagination?: boolean) => {
    const stringifiedQuery = queryString.stringify(filterOptions);
    const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/answers?${stringifiedQuery}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        console.log('GET /v1/answers went wrong');
    }
    const answers = await response.json() as Answer[];
    if (!pagination) {
        answers.pop();
    }
    return answers as Answer[];
}

export const createAnswerComment = createAsyncThunk<
    Comment,
    {
        answerId: string;
        author: string;
        content: string;
    }, {
        rejectValue: string;
        dispatch: AppDispatch;
    }
>('createAnswerComment', async (commentBody, thunkApi) => {
    const { answerId, author, content } = commentBody;
    const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/answers/${answerId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author, content }),
    });
    
    if (!response.ok) {
        return thunkApi.rejectWithValue('POST /v1/answers/:id/comments went wrong');
    }

    const comment = await response.json();
    return comment as Comment;
});

export const updateAnswerComment = createAsyncThunk<
    Comment,
    {
        id: string;
        commentId: string;
        content?: string;
    }, {
        rejectValue: string;
        dispatch: AppDispatch;
    }
>('updateAnswerComment', async (commentBody, thunkApi) => {
    const { id, commentId, ...commentDetailsBody } = commentBody;
    const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/answers/${id}/comments/${commentId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentDetailsBody),
    });
    if (!response.ok) {
        return thunkApi.rejectWithValue('PATCH /v1/answers/comments/:id went wrong');
    }
    const comment = await response.json();
    return comment as Comment;
});

export const getAnswerComments = async (answerId: string) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/answers/${answerId}/comments`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    if (!response.ok) {
        console.log('GET /v1/answers/:id/comments went wrong');
    }
    const comments = await response.json();
    return comments as Comment[];
}
