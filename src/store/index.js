import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authReducer } from "./slices/authSlice";
import { spacesApi } from "./apis/spacesApi";
import { partnersApi } from "./apis/partnersApi";
import { groupsApi } from "./apis/groupsApi";
import { batchsApi } from "./apis/batchsApi";
import { attendanceApi } from "./apis/attandanceApi";
import { groupStudentsApi } from "./apis/groupStudentsApi";
import { checkEmailApi } from "./apis/checkEmailApi";

import {
  changeSearchTerm,
  clearSearchTerm,
  changeFilterBy,
  partnerFilterReducer,
} from "./slices/partnerFilterSlice";

import {
  changeSearchTermm,
  clearSearchTermm,
  changeFilterBym,
  studentFilterReducer,
} from "./slices/studentBatchFilterSlice";

import {
  changeSearchTerma,
  clearSearchTerma,
  changeFilterBya,
  attendanceFilterReducer,
} from "./slices/attendanceFilter";

const store = configureStore({
  reducer: {
    auth: authReducer,
    partnerFilter: partnerFilterReducer,
    studentFilter: studentFilterReducer,
    attendanceFilter: attendanceFilterReducer,
    [partnersApi.reducerPath]: partnersApi.reducer,
    [spacesApi.reducerPath]: spacesApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [batchsApi.reducerPath]: batchsApi.reducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
    [groupStudentsApi.reducerPath]: groupStudentsApi.reducer,
    [checkEmailApi.reducerPath]: checkEmailApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(partnersApi.middleware)
      .concat(spacesApi.middleware)
      .concat(groupsApi.middleware)
      .concat(batchsApi.middleware)
      .concat(attendanceApi.middleware)
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

export { useFetchBatchsQuery } from "./apis/batchsApi";
export { useFetchAttendanceQuery } from "./apis/attandanceApi";

export {
  useFetchStudentsQuery,
  useAddSingleStudentsMutation,
  useUpdateStudentsMutation,
} from "./apis/groupStudentsApi";

export { useCheckEmailQuery } from "./apis/checkEmailApi";

export {
  store,
  changeSearchTerm,
  clearSearchTerm,
  changeFilterBy,
  changeSearchTermm,
  clearSearchTermm,
  changeFilterBym,
  studentFilterReducer,
  //attandance
  changeSearchTerma,
  clearSearchTerma,
  changeFilterBya,
  attendanceFilterReducer,
};
