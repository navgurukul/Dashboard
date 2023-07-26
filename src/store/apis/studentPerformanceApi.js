import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// https://merd-api.merakilearn.org/users/performance?userId=34938&pathway_id=1
const studentPerformanceApi = createApi({
  reducerPath: "studentPerformance",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://merd-api.merakilearn.org/users/",
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
      fetchStudentPerformance: builder.query({
        providesTags: ["StudentPerformance"],
        query: (studentId) => {
          return {
            url: `performance?userId=${studentId}&pathway_id=1`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchStudentPerformanceQuery } = studentPerformanceApi;
export { studentPerformanceApi };
