import { ITag } from '../../types/types';
import { api } from '../api/baseApi';

type TagPayload = Pick<ITag, 'name' | 'short_code'> & { category?: string };

const tagSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getTags: builder.query({
            query: ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => ({
                url: '/tag',
                method: 'GET',
                params: { page, limit },
            }),
            providesTags: ['Tag'],
        }),
        getCategories: builder.query({
            query: ({ limit = 100 }: { limit?: number } = {}) => ({
                url: '/category',
                method: 'GET',
                params: { page: 1, limit },
            }),
        }),
        createTag: builder.mutation({
            query: (data: TagPayload) => ({
                method: 'POST',
                url: '/tag',
                body: data,
            }),
            invalidatesTags: ['Tag'],
        }),
        updateTag: builder.mutation({
            query: ({ id, data }: { id: string; data: TagPayload }) => ({
                method: 'PATCH',
                url: `/tag/${id}`,
                body: data,
            }),
            invalidatesTags: ['Tag'],
        }),
        deleteTag: builder.mutation({
            query: (id: string) => ({
                method: 'DELETE',
                url: `/tag/${id}`,
            }),
            invalidatesTags: ['Tag'],
        }),
    }),
});

export const {
    useGetTagsQuery,
    useGetCategoriesQuery,
    useCreateTagMutation,
    useUpdateTagMutation,
    useDeleteTagMutation,
} = tagSlice;
