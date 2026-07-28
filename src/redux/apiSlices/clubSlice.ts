import { api } from '../api/baseApi';

const clubSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getClubs: builder.query({
            query: ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => ({
                url: '/club',
                method: 'GET',
                params: { page, limit },
            }),
        }),
        getClubById: builder.query({
            query: (id: string) => ({
                url: `/club/${id}`,
                method: 'GET',
            }),
        }),
        getClubClasses: builder.query({
            query: (clubId: string) => ({
                url: `/class/${clubId}`,
                method: 'GET',
                params: { daysFromToday: 360 },
            }),
        }),
    }),
});

export const { useGetClubsQuery, useGetClubByIdQuery, useGetClubClassesQuery } = clubSlice;
