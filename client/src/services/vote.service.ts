import { AppDispatch } from "store/configureStore";
import { createAsyncThunk } from "@reduxjs/toolkit";

export enum VoteType {
    upvote = 'upvote',
    downvote = 'downvote'
}

export interface Vote {
    id: string;
    type: VoteType;
    answerId: string;
    questionId: string;
    commentId?: string;
    voter?: string;
}

export const createVote = createAsyncThunk<
    Vote,
    {
        answerId?: string,
        questionId?: string,
        commentId?: string,
        type: VoteType,
    },
    {
        rejectValue: string;
        dispatchEvent: AppDispatch;
    }
>('createVote', async (voteBody, thunkApi) => {
    const { answerId, questionId, commentId, type } = voteBody;
    const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/votes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            answerId,
            questionId,
            commentId,
            type,
        }),
        credentials: 'include',
    });

    if (!response.ok) {
        const error = await response.json();
        thunkApi.rejectWithValue(error.message);
    }

    const vote = await response.json();
    return vote as Vote;
})

export const updateVote = createAsyncThunk<
    Vote,
    {
        id: string;
        type: VoteType;
    },
    {
        rejectValue: string;
        dispatchEvent: AppDispatch;
    }
>('updateVote', async (voteBody, thunkApi) => {
    const { id, type } = voteBody;
    const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/votes/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type,
        }),
        credentials: 'include',
    });

    if (!response.ok) {
        const error = await response.json();
        thunkApi.rejectWithValue(error.message);
    }

    const vote = await response.json();
    return vote as Vote;
})

export const deleteVote = createAsyncThunk<
    Vote,
    {
        id: string;
    },
    {
        rejectValue: string;
        dispatchEvent: AppDispatch;
    }
>('deleteVote', async (voteBody, thunkApi) => {
    const { id } = voteBody;
    const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/votes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        const error = await response.json();
        thunkApi.rejectWithValue(error.message);
    }

    const vote = await response.json();
    return vote as Vote;
})