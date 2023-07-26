import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const groupsApi = createApi({
  reducerPath: "groups",
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
      fetchGroups: builder.query({
        providesTags: ["Group"],
        query: (space) => {
          return {
            url: `/${space.id}/group`,
            method: "GET",
          };
        },
      }),
      addGroup: builder.mutation({
        invalidatesTags: ["Group"],
        query: (group) => {
          const { spaceId, ...rest } = group;
          return {
            url: `/create/group`,
            params: {
              space_id: spaceId,
            },
            body: { ...rest },
            method: "POST",
          };
        },
      }),
      fetchSingleGroup: builder.query({
        query: (groupId) => {
          return {
            url: `/groupBy/${groupId}`,
            method: `GET`,
          };
        },
      }),
      updateGroup: builder.mutation({
        invalidatesTags: ["Group"],
        query: (group) => {
          const { groupId, ...rest } = group;
          return {
            url: `/group/${groupId}`,
            body: { ...rest },
            method: "PUT",
          };
        },
      }),
      deleteGroup: builder.mutation({
        invalidatesTags: ["Group"],
        query: (group) => {
          return {
            url: `/group/${group.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchGroupsQuery,
  useAddGroupMutation,
  useFetchSingleGroupQuery,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} = groupsApi;
export { groupsApi };
