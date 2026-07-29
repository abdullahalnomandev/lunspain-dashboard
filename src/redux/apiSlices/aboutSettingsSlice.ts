import { ISetting, SettingPayload } from '../../types/types';
import { api } from '../api/baseApi';

type SettingResponse = {
    data: ISetting;
};

const aboutSettingsSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAboutSettings: builder.query<ISetting, void>({
            query: () => ({
                url: '/settings/about',
                method: 'GET',
            }),
            transformResponse: (response: SettingResponse) => response.data,
            providesTags: ['AboutSettings'],
        }),
        updateAboutSettings: builder.mutation<ISetting, SettingPayload>({
            query: (body) => ({
                url: '/settings/about',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['AboutSettings'],
        }),
    }),
});

export const { useGetAboutSettingsQuery, useUpdateAboutSettingsMutation } = aboutSettingsSlice;
