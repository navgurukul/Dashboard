import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const spacesApi = createApi({
  reducerPath: "spaces",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://dev-api.navgurukul.org/apiDocs/partners`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set(`authorization`, `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchSpaces: builder.query({
        query: (partner) => {
          return {
            url: "/space/{partner_id}",
            params: {
              ["partner_id"]: partner.id,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchSpacesQuery } = spacesApi;
export { spacesApi };
