import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const partnersApi = createApi({
  reducerPath: "partners",
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
      fetchPartners: builder.query({
        providesTags: ["Partner"],
        query: () => {
          return {
            url: `/partners`,
            method: "GET",
          };
        },
      }),
      addPartner: builder.mutation({
        invalidatesTags: ["Partner"],
        query: (partner) => {
          return {
            url: `/partners/create/newpartner`,
            body: { ...partner },
            method: "POST",
          };
        },
      }),
      removePartner: builder.mutation({
        invalidatesTags: ["Partner"],
        query: (partner) => {
          return {
            url: `/partners/${partner.id}`,
            method: "DELETE",
          };
        },
      }),
      updatePartner: builder.mutation({
        invalidatesTags: ["Partner"],
        query: (partner) => {
          const { partnerId, ...rest } = partner;
          return {
            url: `/partners/${partnerId}`,
            body: { ...rest },
            method: "PUT",
          };
        },
      }),
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

export const {
  useFetchSinglePartnerQuery,
  useFetchPartnersQuery,
  useAddPartnerMutation,
  useRemovePartnerMutation,
  useUpdatePartnerMutation,
} = partnersApi;
export { partnersApi };
