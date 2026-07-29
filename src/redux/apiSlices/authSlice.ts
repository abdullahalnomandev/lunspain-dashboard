import { getFromLocalStorage } from "../../utils/local-storage";
import { api } from "../api/baseApi";

// It's better to retrieve resetToken fresh for each request, in case of changes during session
export const PROFILE_QUERY_ARG = undefined;

const authSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        otpVerify: builder.mutation({
            query: (data: any) => {
                return {
                    method: "POST",
                    url: "/auth/verify-email",
                    body: data,
                };
            },
        }),

        login: builder.mutation({
            query: (data: any) => {
                return {
                    method: "POST",
                    url: "/auth/admin-login",
                    body: data,
                };
            },
        }),

        forgetPassword: builder.mutation({
            query: (data: any) => {
                return {
                    method: "POST",
                    url: "/auth/forget-password",
                    body: data,
                };
            },
        }),

        resetPassword: builder.mutation({
            // Retrieve token at call-time for accuracy, not file-init time
            query: (value: any) => ({
                url: "/auth/reset-password",
                headers: { authorization: getFromLocalStorage("resetToken") ?? undefined },
                method: "POST",
                body: value,
            }),
        }),

        changePassword: builder.mutation({
            query: (data: any) => {
                return {
                    method: "POST",
                    url: "/auth/change-password",
                    body: data,
                };
            },
        }),

        updateProfile: builder.mutation({
            query: (data: FormData) => ({
                method: "PATCH",
                url: "/user/profile",
                body: data,
                prepareHeaders: (headers: Headers) => {
                    headers.delete("content-type");
                    return headers;
                },
            }),
            invalidatesTags: [{ type: "Profile" as const, id: "CURRENT" }],
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data: response } = await queryFulfilled;

                    dispatch(
                        // @ts-expect-error
                        api.util.updateQueryData("profile", PROFILE_QUERY_ARG, (draft: any) => {
                            if (response?.data) {
                                draft.data = {
                                    ...draft.data,
                                    ...response.data,
                                    profile: {
                                        ...draft.data?.profile,
                                        ...response.data?.profile,
                                    },
                                };
                            }
                        })
                    );
                } catch {
                    // invalidatesTags handles refetch if cache patch fails
                }
            },
        }),

        profile: builder.query({
            query: () => ({
                url: "/user/profile",
            }),
            providesTags: [{ type: "Profile" as const, id: "CURRENT" }],
        }),
    }),
});

export const {
    useOtpVerifyMutation,
    useLoginMutation,
    useForgetPasswordMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
    useUpdateProfileMutation,
    useProfileQuery,
} = authSlice;