import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'app/components/SignInPanel/slice/types';
import { AppDispatch } from 'store/configureStore';
import queryString from 'query-string';

export enum ReportStatus {
    pending = 'pending',
    approved = 'approved',
    rejected = 'rejected'
}  

export enum ReportedType {
    question = 'question',
    answer = 'answer',
    user = 'user',
    none = 'none',
}

export interface Report {
    id: string;
    details: string;
    reporter: User;
    reportedType: ReportedType;
    answerId?: string;
    questionId?: string;
    userId?: string;
    createdAt: string;
    highlightLink: string;
    title: string;
    status: ReportStatus;
}

export const createReport = createAsyncThunk<
    Report,
    {
        details: string;
        reporter: string;
        type: ReportedType;
        answerId?: string;
        questionId?: string;
        userId?: string;
    },
    {
        rejectValue: string;
        dispatch: AppDispatch;
    }
>('createReport', async (reportBody, thunkApi) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/reports`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportBody),
    });
    if (!response.ok) {
        return thunkApi.rejectWithValue('GET /reports went wrong');
    }
    const report = await response.json();
    return report as Report;
})

export const getReports = async (queryOptions: { limit: number, page: number, type: ReportedType, sortDesc: string }): Promise<Report[]> => {
    const stringifiedQuery = queryString.stringify(queryOptions);
    const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/reports?${stringifiedQuery}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        console.log('GET /v1/reports went wrong');
    }
    const reports = await response.json();
    return reports as Report[];
}

export const updateReportStatus = createAsyncThunk<
    Report,
    {
        id: string;
        status: ReportStatus;
        response: string;
    },
    {
        rejectValue: string;
        dispatch: AppDispatch;
    }
>('updateReportStatus', async (reportBody, thunkApi) => {
    const { id, status, response } = reportBody;
    const res = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/reports/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, response }),
    });

    if (!res.ok) {
        return thunkApi.rejectWithValue('PATCH /v1/reports/:id went wrong');
    }
    const report = await res.json();
    return report as Report;
})