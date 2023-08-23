import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: { token: JSON.parse(localStorage.getItem("AUTH"))?.token },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload; 
    },
  },
  extraReducers(builder) {},
});
export const { setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;