import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { partnersReducer } from "./slices/partnersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    partners: partnersReducer,
  },
});

export { store };

export { fetchPartners } from "./thunks/fetchPartners";
