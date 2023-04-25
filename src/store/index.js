import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { partnersReducer } from "./slices/partnersSlice";
// import { partnersApi } from "./apis/partnersApi";

import {
  changeSearchTerm,
  clearSearchTerm,
  changeFilterBy,
  partnerFilterReducer,
} from "./slices/partnerFilterSlice";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = configureStore({
  reducer: {
    auth: authReducer,
    partners: partnersReducer,
    partnerFilter: partnerFilterReducer,
    // [partnersApi.reducerPath]: partnersApi.reducer,
  },
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware().concat(partnersApi.middleware);
  // },
});

// setupListeners(store.dispatch);

export { store, changeSearchTerm, clearSearchTerm, changeFilterBy };

export * from "./thunks/fetchPartners";
export * from "./thunks/addPartner";
export * from "./thunks/deletePartner";
export * from "./thunks/updatePartner";
