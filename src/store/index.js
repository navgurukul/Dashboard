import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authReducer } from "./slices/authSlice";
import { spacesApi } from "./apis/spacesApi";
import { partnersApi } from "./apis/partnersApi";
import { groupsApi } from "./apis/groupsApi";

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
    [partnersApi.reducerPath]: partnersApi.reducer,
    [spacesApi.reducerPath]: spacesApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(partnersApi.middleware)
      .concat(spacesApi.middleware)
      .concat(groupsApi.middleware);
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
} from "./apis/groupsApi";

export { store, changeSearchTerm, clearSearchTerm, changeFilterBy };
