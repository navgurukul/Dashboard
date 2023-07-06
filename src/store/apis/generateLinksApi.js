import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const genereateLinksApi = createApi({
  reducerPath: "generateLinks",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://merd-api.merakilearn.org/partner/group",
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
      getLinks: builder.mutation({
        query: ({ partnerId, groupId, spaceId }) => {
          return {
            url: "/link",
            params: {
              partner_id: partnerId,
              space_id: spaceId,
              group_id: groupId,
            },
            method: "PUT",
          };
        },
      }),
    };
  },
});

export const { useGetLinksMutation } = genereateLinksApi;
export { genereateLinksApi };
