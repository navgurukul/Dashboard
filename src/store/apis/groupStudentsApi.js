import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const groupStudentsApi = createApi({
  reducerPath: "groupStudents",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://merd-api.merakilearn.org/partners",
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
      fetchStudents: builder.query({
        providesTags: ["GroupStudents"],
        query: (groupId) => {
          return {
            url: `/students/${groupId}`,
            method: "GET",
          };
        },
      }),
      addSingleStudents: builder.mutation({
        invalidatesTags: ["GroupStudents"],
        query: ({ students, groupId }) => {
          return {
            url: `/${groupId}/addstudent`,
            body: students,
            method: "POST",
          };
        },
      }),
    };
  },
});

export { groupStudentsApi };
export const { useAddSingleStudentsMutation, useFetchStudentsQuery } =
  groupStudentsApi;
