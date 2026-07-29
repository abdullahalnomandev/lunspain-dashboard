import { ISetting, SettingPayload } from '../../types/types';
import { api } from '../api/baseApi';

type SettingResponse = {
    data: ISetting;
};

const termsOfServiceSettingsSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getTermsOfServiceSettings: builder.query<ISetting, void>({
            query: () => ({
                url: '/settings/terms-of-services',
                method: 'GET',
            }),
            transformResponse: (response: SettingResponse) => response.data,
            providesTags: ['TermsOfServiceSettings'],
        }),
        updateTermsOfServiceSettings: builder.mutation<ISetting, SettingPayload>({
            query: (body) => ({
                url: '/settings/terms-of-services',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['TermsOfServiceSettings'],
        }),
    }),
});

export const { useGetTermsOfServiceSettingsQuery, useUpdateTermsOfServiceSettingsMutation } =
    termsOfServiceSettingsSlice;
