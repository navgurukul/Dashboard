import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwMjMwIiwiZW1haWwiOiJHaXJpYmFidTIyQG5hdmd1cnVrdWwub3JnIiwiaWF0IjoxNjg3OTI5MjMwLCJleHAiOjE3MTk0ODY4MzB9.VSZdbvVj9TuQgYvm6k1yNQYLMcvG9GGBzpH-YtLidjc",
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0NTAxIiwiZW1haWwiOiJhYWRhcnNoMjFAbmF2Z3VydWt1bC5vcmciLCJpYXQiOjE2Nzg3ODA4MDIsImV4cCI6MTcxMDMzODQwMn0.PYkl5H4bE10CtE_VUKU11q8MquHGs3xSdmAbTEctwUA"
  },
  reducers: {},
  extraReducers(builder) {},
});

export const authReducer = authSlice.reducer;

