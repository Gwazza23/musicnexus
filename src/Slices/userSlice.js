import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfileInfo } from "../Util/spotify";

const fetchUserProfile = createAsyncThunk("user/fetchUserProfile", async () => {
  const response = await getProfileInfo();
  return response.data;
});

const userSlice = createSlice({
  name: "userProfile",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "completed";
        state.data = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export { fetchUserProfile };

export default userSlice.reducer;

export const selectUser = (state) => state.user;
