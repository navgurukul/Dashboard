import { createSlice } from "@reduxjs/toolkit";

const attendanceFilter = createSlice({
  name: "attendanceFilter",
  initialState: {
    searchTerm: "",
    filterBy: "All Students",
  },
  reducers: {
    changeSearchTerma(state, action) {
      state.searchTerm = action.payload;
    },
    clearSearchTerma(state, action) {
      state.searchTerm = "";
    },
    changeFilterBya(state, action) {
      state.filterBy = action.payload;
    },
  },
});

export const { changeSearchTerma, clearSearchTerma, changeFilterBya } =
    attendanceFilter.actions;
export const attendanceFilterReducer = attendanceFilter.reducer;
