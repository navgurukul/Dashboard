import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authReducer } from "./slices/authSlice";
import { spacesApi } from "./apis/spacesApi";
import { partnersApi } from "./apis/partnersApi";
import { groupsApi } from "./apis/groupsApi";
import { groupStudentsApi } from "./apis/groupStudentsApi";
import { checkEmailApi } from "./apis/checkEmailApi";

import {
  changeSelectedCourse,
  selectedCourseReducer,
} from "./slices/selectedCourseSlice";

import {
  changeSearchTerm,
  clearSearchTerm,
  changeFilterBy,
  partnerFilterReducer,
} from "./slices/partnerFilterSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    partnerFilter: partnerFilterReducer,
    selectedCourse: selectedCourseReducer,
    [partnersApi.reducerPath]: partnersApi.reducer,
    [spacesApi.reducerPath]: spacesApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [groupStudentsApi.reducerPath]: groupStudentsApi.reducer,
    [checkEmailApi.reducerPath]: checkEmailApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(partnersApi.middleware)
      .concat(spacesApi.middleware)
      .concat(groupsApi.middleware)
      .concat(groupStudentsApi.middleware)
      .concat(checkEmailApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useFetchSinglePartnerQuery,
  useFetchPartnersQuery,
  useAddPartnerMutation,
  useRemovePartnerMutation,
  useUpdatePartnerMutation,
} from "./apis/partnersApi";

export {
  useFetchSpacesQuery,
  useAddSpaceMutation,
  useRemoveSpaceMutation,
  useUpdateSpaceMutation,
  useFetchSingleSpaceQuery,
} from "./apis/spacesApi";

export {
  useFetchGroupsQuery,
  useAddGroupMutation,
  useFetchSingleGroupQuery,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} from "./apis/groupsApi";

export {
  useFetchStudentsQuery,
  useAddSingleStudentsMutation,
} from "./apis/groupStudentsApi";

export { useCheckEmailQuery } from "./apis/checkEmailApi";

export {
  store,
  changeSearchTerm,
  clearSearchTerm,
  changeFilterBy,
  changeSelectedCourse,
};
