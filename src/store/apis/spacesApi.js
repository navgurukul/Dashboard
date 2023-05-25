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
        providesTags: ["Spaces"],
        query: (partner) => {
          return {
            url: `/space/${partner.id}`,
            // params: {
            //   ["partner_id"]: partner.id,
            // },
            method: "GET",
          };
        },
      }),
      addSpace: builder.mutation({
        invalidatesTags: ["Spaces"],
        query: (space) => {
          const { partnerId, ...rest } = space;
          return {
            url: "/create/newspace",
            params: {
              ["partner_id"]: partnerId,
            },
            body: {
              ...rest,
            },
            method: "POST",
          };
        },
      }),
      removeSpace: builder.mutation({
        invalidatesTags: ["Spaces"],
        query: (space) => {
          return {
            url: `/space/${space.id}`,
            method: "DELETE",
          };
        },
      }),
      updateSpace: builder.mutation({
        invalidatesTags: ["Spaces"],
        query: (space) => {
          const { spaceId, ...rest } = space;
          return {
            url: `/space/${spaceId}`,
            body: { ...rest },
            method: "PUT",
          };
        },
      }),
    };
  },
});

export const {
  useFetchSpacesQuery,
  useAddSpaceMutation,
  useRemoveSpaceMutation,
  useUpdateSpaceMutation,
} = spacesApi;

export { spacesApi };
