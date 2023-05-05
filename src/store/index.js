import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authReducer } from "./slices/authSlice";
import { partnersReducer } from "./slices/partnersSlice";
import { spacesApi } from "./apis/spacesApi";
// import { partnersApi } from "./apis/partnersApi";

import {
  changeSearchTerm,
  clearSearchTerm,
  changeFilterBy,
  partnerFilterReducer,
} from "./slices/partnerFilterSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    partners: partnersReducer,
    partnerFilter: partnerFilterReducer,
    //API'S
    [spacesApi.reducerPath]: spacesApi.reducer,
    // [partnersApi.reducerPath]: partnersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(spacesApi.middleware);
  },
});

setupListeners(store.dispatch);

export { useFetchSpacesQuery } from "./apis/spacesApi";

export { store, changeSearchTerm, clearSearchTerm, changeFilterBy };

export * from "./thunks/fetchPartners";
export * from "./thunks/addPartner";
export * from "./thunks/deletePartner";
export * from "./thunks/updatePartner";
