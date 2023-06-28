import { createSlice } from "@reduxjs/toolkit";

const studentFilter = createSlice({
  name: "studentFilter",
  initialState: {
    searchTerm: "",
    filterBy: "All Students",
  },
  reducers: {
    changeSearchTermm(state, action) {
      state.searchTerm = action.payload;
    },
    clearSearchTermm(state, action) {
      state.searchTerm = "";
    },
    changeFilterBym(state, action) {
      state.filterBy = action.payload;
    },
  },
});

export const { changeSearchTermm, clearSearchTermm, changeFilterBym } =
studentFilter.actions;
export const studentFilterReducer = studentFilter.reducer;
