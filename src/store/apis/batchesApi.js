import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const batchesApi = createApi({
  reducerPath: "batches",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://merd-api.merakilearn.org",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchBatches: builder.query({
        providesTags: ["Batches"],
        query: (groupId) => {
          return {
            url: `partners/batches/${groupId}`,
            method: "GET",
          };
        },
      }),
      addBatch: builder.mutation({
        invalidatesTags: ["Batches"],
        query: (batch) => {
          return {
            url: `/classes`,
            body: batch,
            method: "POST",
          };
        },
      }),
      fetchVolunteers: builder.query({
        query: () => {
          return {
            url: "/volunteers",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useFetchBatchesQuery,
  useAddBatchMutation,
  useFetchVolunteersQuery,
} = batchesApi;
export { batchesApi };
