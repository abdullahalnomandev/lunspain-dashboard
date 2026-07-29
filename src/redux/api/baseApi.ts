import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_ENDPOINT + '/api/v1',

        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),

    tagTypes: ['Facility', 'Package', 'Review', 'Tag', 'Coupon', 'AboutSettings', 'PrivacyPolicySettings', 'TermsOfServiceSettings', 'DisclaimerSettings', 'Profile'],
    endpoints: () => ({}),
});

export const imageUrl = import.meta.env.VITE_API_ENDPOINT;
