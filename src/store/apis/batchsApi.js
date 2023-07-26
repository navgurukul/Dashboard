import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//https://merd-api.merakilearn.org/partners/batch_details/1252
const batchsApi = createApi({
  reducerPath: "batchs",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://merd-api.merakilearn.org",
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
      fetchBatchs: builder.query({
        providesTags: ["Batch"],
        query: (Id) => {
          return {
            url: `/classes/${Id}/students?pathway_id=1`,
            method: "GET",
          };
        },
      }),
      fetchSingleBatch: builder.query({
        query: (batchId) => {
          return {
            url: `/partners/batch_details/${batchId}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
   useFetchBatchsQuery,
   useFetchSingleBatchQuery,
   } = batchsApi;
export { batchsApi };
