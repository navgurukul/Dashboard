import { createSlice } from "@reduxjs/toolkit";

const selectedCourse = createSlice({
  name: "selectedCourse",
  initialState: {
    courseName: "",
  },
  reducers: {
    changeSelectedCourse(state, action) {
      state.courseName = action.payload;
    },
  },
});

export const { changeSelectedCourse } = selectedCourse.actions;
export const selectedCourseReducer = selectedCourse.reducer;
