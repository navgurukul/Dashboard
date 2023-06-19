import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const attendanceApi = createApi({
  reducerPath: "attendance",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hub.dummyapis.com",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints(builder){
    return {
      fetchAttendance: builder.query({
        providesTags: ["Attendance"],
        query: (noofRecords = 20) => {
          return {
            url: `/employee`,
            method: "GET",
            params: {
              noofRecords,
            },
          };
        },
      }),
    };
  },
});

export const { useFetchAttendanceQuery } = attendanceApi;
export { attendanceApi };