import { createSlice } from "@reduxjs/toolkit";

const attendanceFilter = createSlice({
  name: "attendanceFilter",
  initialState: {
    searchTerm: "",
    filterBy: "All Students",
  },
  reducers: {
    changeSearchTerm_attendance(state, action) {
      state.searchTerm = action.payload;
    },
    clearSearchTerm_attendance(state, action) {
      state.searchTerm = "";
    },
    changeFilterBy_attendance(state, action) {
      state.filterBy = action.payload;
    },
  },
});

export const {
  changeSearchTerm_attendance,
  clearSearchTerm_attendance,
  changeFilterBy_attendance,
} = attendanceFilter.actions;
export const attendanceFilterReducer = attendanceFilter.reducer;
