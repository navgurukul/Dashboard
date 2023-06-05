import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const batchsApi = createApi({
  reducerPath: "batchs",
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
  endpoints(builder) {
    return {
      fetchBatchs: builder.query({
        providesTags: ["Batch"],
        query: () => {
          return {
            url: `/employee`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchBatchsQuery } = batchsApi;
export { batchsApi };
