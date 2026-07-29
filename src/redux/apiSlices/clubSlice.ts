import { IClass, IClub, IClubClassesData, IPagination } from '../../types/types';
import { api } from '../api/baseApi';

type PaginatedClubsResponse = {
    data: {
        pagination: IPagination;
        data: IClub[];
    };
};

type ClubDetailResponse = {
    data: IClub;
};

type ClubClassesResponse = {
    data: IClubClassesData;
};

const flattenClubClasses = (data: IClubClassesData): IClass[] => [
    ...(data.today ?? []),
    ...(data.thisWeek ?? []),
    ...(data.nextWeek ?? []),
    ...(data.afterNextWeek ?? []),
];

const clubSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getClubs: builder.query<{ pagination: IPagination; data: IClub[] }, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 10 }) => ({
                url: '/club/all-clubs',
                method: 'GET',
                params: { page, limit },
            }),
            transformResponse: (response: PaginatedClubsResponse) => response.data,
        }),
        getTopClubs: builder.query<IClub[], void>({
            query: () => ({
                url: '/club/top-clubs',
                method: 'GET',
            }),
            transformResponse: (response: { data: IClub[] }) => response.data,
        }),
        getClubById: builder.query<IClub, string>({
            query: (id) => ({
                url: `/club/${id}`,
                method: 'GET',
            }),
            transformResponse: (response: ClubDetailResponse) => response.data,
        }),
        getClubClasses: builder.query<IClass[], string>({
            query: (clubId) => ({
                url: `/class/${clubId}`,
                method: 'GET',
                params: { daysFromToday: 360 },
            }),
            transformResponse: (response: ClubClassesResponse) => flattenClubClasses(response.data),
        }),
    }),
});

export const { useGetClubsQuery, useGetTopClubsQuery, useGetClubByIdQuery, useGetClubClassesQuery } = clubSlice;
