import { api } from '../api/baseApi';

const notificationSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getNotification: builder.query({
            query: ({ page = 1, limit = 10 }) => ({
                url: '/notification',
                method: 'GET',
                params: { page, limit },
            }),
        }),

        changeStatusNotification: builder.mutation({
            query: ({ id }: { id: string }) => ({
                method: 'PATCH',
                url: `/notification/${id}`,
            }),
            invalidatesTags: ['Notification'],
        }),
        readAllNotification: builder.mutation({
            query: () => ({
                method: 'PATCH',
                url: `/notification/read-all`,
            }),
            invalidatesTags: ['Notification'],
        }),
    }),
});

export const { useGetNotificationQuery, useChangeStatusNotificationMutation, useReadAllNotificationMutation } =
    notificationSlice;
