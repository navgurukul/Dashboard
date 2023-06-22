import { createSlice } from "@reduxjs/toolkit";

const selectedCourse = createSlice({
  name: "selectedCourse",
  initialState: {
    course:{},
  },
  reducers: {
    changeSelectedCourse(state, action) {
      state.course = action.payload;
    },
  },
});

export const { changeSelectedCourse } = selectedCourse.actions;
export const selectedCourseReducer = selectedCourse.reducer;
