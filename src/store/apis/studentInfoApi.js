import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const studentInfoApi = createApi({
  reducerPath: "studentInfo",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://merd-api.merakilearn.org/",
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
      fetchStudentInfo: builder.query({
        providesTags: ["StudentInfo"],
        query: (studentId) => {
          return {
            url: `users/${studentId}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchStudentInfoQuery } = studentInfoApi;
export { studentInfoApi };
