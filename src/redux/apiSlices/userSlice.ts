import { api } from '../api/baseApi';

const userSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => ({
                url: '/user',
                method: 'GET',
                params: {
                    page,
                    limit,
                },
            }),
        }),
        changeStatusUser: builder.mutation({
            query: ({ id, status }: { id: string; status: 'active' | 'delete' }) => ({
                method: 'PATCH',
                url: `/user/${id}`,
                body: { status },
            }),
        }),

        getHosts: builder.query({
            query: ({ query }: { query?: string }) => {
                return {
                    url: '/user/host?' + query,
                };
            },
        }),
    }),
});
export const { useGetUsersQuery, useChangeStatusUserMutation, useGetHostsQuery } = userSlice;
