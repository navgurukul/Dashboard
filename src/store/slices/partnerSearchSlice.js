import { createSlice } from "@reduxjs/toolkit";

const partnerSearch = createSlice({
  name: "partners",
  initialState: {
    searchTerm: "",
  },
  reducers: {
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    clearSearchTerm(state, action) {
      state.searchTerm = "";
    },
  },
});

export const { changeSearchTerm, clearSearchTerm } = partnerSearch.actions;
export const partnerSearchReducer = partnerSearch.reducer;
