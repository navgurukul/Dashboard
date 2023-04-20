import { createSlice } from "@reduxjs/toolkit";
import { fetchPartners } from "../thunks/fetchPartners";

const partnersSlice = createSlice({
  name: "partners",
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(fetchPartners.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPartners.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.partners;
    });
    builder.addCase(fetchPartners.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const partnersReducer = partnersSlice.reducer;
