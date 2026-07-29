import { ISetting, SettingPayload } from '../../types/types';
import { api } from '../api/baseApi';

type SettingResponse = {
    data: ISetting;
};

const disclaimerSettingsSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getDisclaimerSettings: builder.query<ISetting, void>({
            query: () => ({
                url: '/settings/disclaimer',
                method: 'GET',
            }),
            transformResponse: (response: SettingResponse) => response.data,
            providesTags: ['DisclaimerSettings'],
        }),
        updateDisclaimerSettings: builder.mutation<ISetting, SettingPayload>({
            query: (body) => ({
                url: '/settings/disclaimer',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['DisclaimerSettings'],
        }),
    }),
});

export const { useGetDisclaimerSettingsQuery, useUpdateDisclaimerSettingsMutation } = disclaimerSettingsSlice;
