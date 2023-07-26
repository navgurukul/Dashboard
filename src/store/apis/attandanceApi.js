import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const attendanceApi = createApi({
  reducerPath: "attendance",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://merd-api.merakilearn.org/classes",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchAttendance: builder.query({
        providesTags: ["Attendance"],
        query: (Id) => {
          return {
            url: `/${Id}/students`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchAttendanceQuery } = attendanceApi;
export { attendanceApi };
