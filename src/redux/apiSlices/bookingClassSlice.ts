import { api } from "../api/baseApi";

const bookingClassSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getBookingClassAttendance: builder.query({
            query: ({ page = 1, limit = 10 }) => ({
                url: "/book-class-attandence",
                method: "GET",
                params: { page, limit },
            }),
        }),
    }),
});

export const { useGetBookingClassAttendanceQuery } = bookingClassSlice;