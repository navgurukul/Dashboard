// PartnerNameApi.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PartnerNameApi = createApi({
  reducerPath: "partner",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://merd-api.merakilearn.org", // Base URL for the partner API
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
      fetchPartnerName: builder.query({
        query: (partnerId) => {
          return {
            url: `/partner/${partnerId}`, // API endpoint to fetch partner name
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchPartnerNameQuery } = PartnerNameApi;
export { PartnerNameApi };
