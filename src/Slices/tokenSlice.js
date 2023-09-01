import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
};

const accessTokenSlice = createSlice({
  name: "accessToken",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = accessTokenSlice.actions;

export const selectToken = (state) => state.accessToken;

export default accessTokenSlice.reducer;
