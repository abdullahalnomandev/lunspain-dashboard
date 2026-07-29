import { ISetting, SettingPayload } from '../../types/types';
import { api } from '../api/baseApi';

type SettingResponse = {
    data: ISetting;
};

const privacyPolicySettingsSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getPrivacyPolicySettings: builder.query<ISetting, void>({
            query: () => ({
                url: '/settings/privacy-policy',
                method: 'GET',
            }),
            transformResponse: (response: SettingResponse) => response.data,
            providesTags: ['PrivacyPolicySettings'],
        }),
        updatePrivacyPolicySettings: builder.mutation<ISetting, SettingPayload>({
            query: (body) => ({
                url: '/settings/privacy-policy',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['PrivacyPolicySettings'],
        }),
    }),
});

export const { useGetPrivacyPolicySettingsQuery, useUpdatePrivacyPolicySettingsMutation } =
    privacyPolicySettingsSlice;
