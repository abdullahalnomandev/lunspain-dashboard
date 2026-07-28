import { ICoupon } from '../../types/types';
import { api } from '../api/baseApi';

type CouponPayload = Pick<ICoupon, 'code' | 'type' | 'value' | 'active'>;

const couponSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getCoupons: builder.query({
            query: ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => ({
                url: '/coupon',
                method: 'GET',
                params: { page, limit },
            }),
            providesTags: ['Coupon'],
        }),
        createCoupon: builder.mutation({
            query: (data: CouponPayload) => ({
                method: 'POST',
                url: '/coupon',
                body: data,
            }),
            invalidatesTags: ['Coupon'],
        }),
        updateCoupon: builder.mutation({
            query: ({ id, data }: { id: string; data: CouponPayload }) => ({
                method: 'PATCH',
                url: `/coupon/${id}`,
                body: data,
            }),
            invalidatesTags: ['Coupon'],
        }),
        deleteCoupon: builder.mutation({
            query: (id: string) => ({
                method: 'DELETE',
                url: `/coupon/${id}`,
            }),
            invalidatesTags: ['Coupon'],
        }),
    }),
});

export const {
    useGetCouponsQuery,
    useCreateCouponMutation,
    useUpdateCouponMutation,
    useDeleteCouponMutation,
} = couponSlice;
