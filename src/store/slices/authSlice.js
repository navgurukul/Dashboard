import { createSlice } from "@reduxjs/toolkit";

const tokenId = JSON.parse(localStorage.getItem("AUTH"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: tokenId.token,
  },
  reducers: {},
  extraReducers(builder) {},
});

export const authReducer = authSlice.reducer;
