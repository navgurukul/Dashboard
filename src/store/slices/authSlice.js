import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0NTAxIiwiZW1haWwiOiJhYWRhcnNoMjFAbmF2Z3VydWt1bC5vcmciLCJpYXQiOjE2ODk1NjkyMDQsImV4cCI6MTcyMTEyNjgwNH0.Dx-elw94WqsIAI3b1LT4Yxlq13SE8zhaaEovInFEuqc"
  },
  reducers: {},
  extraReducers(builder) {},
});

export const authReducer = authSlice.reducer;
