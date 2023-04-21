import { createSlice } from "@reduxjs/toolkit";
import { fetchPartners } from "../thunks/fetchPartners";
import { addPartner } from "../thunks/addPartner";
import { updatePartner } from "../thunks/updatePartner";
import { deletePartner } from "../thunks/deletePartner";

const partnersSlice = createSlice({
  name: "partners",
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  extraReducers(builder) {
    // FETCH PARTNERS
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

    // ADD PARTNER
    builder.addCase(addPartner.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addPartner.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addPartner.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // UPDATE PARTNER
    builder.addCase(updatePartner.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updatePartner.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.data.findIndex(
        (partner) => partner.id === action.payload.id
      );
      if (index !== -1) {
        state.data.splice(index, 1, action.payload);
      }
    });
    builder.addCase(updatePartner.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // DELETE PARTNER
    builder.addCase(deletePartner.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deletePartner.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.data.findIndex(
        (partner) => partner.id === action.payload.id
      );
      if (index !== -1) {
        state.data.slice(index, 1);
      }
    });
    builder.addCase(deletePartner.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const partnersReducer = partnersSlice.reducer;
