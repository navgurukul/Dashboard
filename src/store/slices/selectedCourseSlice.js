import { createSlice } from "@reduxjs/toolkit";

const selectedCourse = createSlice({
  name: "selectedCourse",
  initialState: {
    course: {},
    id: {},
  },
  reducers: {
    changeSelectedCourse(state, action) {
      state.course = action.payload;
    },
    changeId(state, action) {
      state.id.spaceId = action.payload.space_id;
      state.id.groupId = action.payload.group_id;
    },
  },
});

export const { changeSelectedCourse, changeId } = selectedCourse.actions;
export const selectedCourseReducer = selectedCourse.reducer;
