import { createAsyncThunk } from "@reduxjs/toolkit";
import { Question } from "app/components/QuestionDetails/slice/types";
import { AppDispatch } from "store/configureStore";

export type Search = {
    score: number; 
    question: Question
}

export const fullTextSearch = createAsyncThunk<
    { score: number; question: Question }[],
    { text: string, amount: number, page: number },
    {
        rejectValue: string;
        dispatch: AppDispatch;
    }    
>('fullTextSearch', async ({ text, amount, page }, thunkApi) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/searching?text=${text}&amount=${amount}&page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const questions = await response.json();
    return questions as Search[]; 
})

export const getSuggestedQuestions = async (text: string) => {
    const amount = 5;
    const page = 1;
    const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/searching?text=${text}&amount=${amount}&page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        const questions = await response.json();
        return questions as Search[];
    } else {
        console.log(response.text);
    }
}