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
    builder.addCase(addPartner.fulfilled, (state, action) => {
      alert("added partner");
      state.isLoading = false;
      state.data.push(action.payload);
    });

    // UPDATE PARTNER
    builder.addCase(updatePartner.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.data.findIndex(
        (partner) => partner.id === action.payload.id
      );
      if (index !== -1) {
        state.data.splice(index, 1, action.payload);
      }
    });

    // DELETE PARTNER
    builder.addCase(deletePartner.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.data.findIndex(
        (partner) => partner.id === action.payload.id
      );
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    });
  },
});

export const partnersReducer = partnersSlice.reducer;
