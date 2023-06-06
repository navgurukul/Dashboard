import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const checkEmailApi = createApi({
  reducerPath: "checkEmail",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://merd-api.merakilearn.org`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set(`authorization`, `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      checkEmail: builder.query({
        query: (email) => {
          return {
            url: `/student/${email}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useCheckEmailQuery } = checkEmailApi;
export { checkEmailApi };
