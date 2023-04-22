// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const partnersApi = createApi({
//   reducerPath: "partnersApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://dev-api.navgurukul.org/apiDocs",
//     prepareHeaders: (headers, { getState }) => {
//       const token = getState().auth.token;

//       if (token) {
//         headers.set("authorization", `Bearer ${token}`);
//       }

//       return headers;
//     },
//   }),
//   endpoints(builder) {
//     return {
//       addPartner: builder.mutation({
//         query: (partner) => {
//           return {
//             url: "/partners/newpartner",
//             method: "POST",
//             body: {
//               point_of_contact_name: partner.pocName,
//               email: partner.pocEmail,
//               platform: "string",
//             },
//           };
//         },
//       }),
//     };
//   },
// });

// export const { useAddPartnerMutation } = partnersApi;
// export { partnersApi };
