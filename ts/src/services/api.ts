import Question from '../types/Question';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const URL = 'http://localhost:8080/cjc/api/v1';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    endpoints: (builder) => ({
        getQuestionsByStatus: builder.query<Question[], { status: string; bearerToken?: string }>({
            query: ({ status, bearerToken }) => {
                const headers = bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {};
                return {
                    url: `question/all-by-status?status=${status}`,
                    method: 'GET',
                    headers,
                };
            },
        }),
    }),
});

export const { useGetQuestionsByStatusQuery } = api;
