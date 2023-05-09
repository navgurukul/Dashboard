import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const partnersApi = createApi({
  reducerPath: "partnersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dev-api.navgurukul.org/apiDocs",
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
      fetchSinglePartner: builder.query({
        query: (partnerId) => {
          return {
            url: `/partners/${partnerId}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchSinglePartnerQuery } = partnersApi;
export { partnersApi };
