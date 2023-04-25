import { createSlice } from "@reduxjs/toolkit";

const partnerFilter = createSlice({
  name: "partnerFilter",
  initialState: {
    searchTerm: "",
    filterBy: "All Partners",
  },
  reducers: {
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    clearSearchTerm(state, action) {
      state.searchTerm = "";
    },
    changeFilterBy(state, action) {
      state.filterBy = action.payload;
    },
  },
});

export const { changeSearchTerm, clearSearchTerm, changeFilterBy } =
  partnerFilter.actions;
export const partnerFilterReducer = partnerFilter.reducer;
