import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfileInfo, getUserFollowing } from "../Util/spotify";

const fetchUserProfile = createAsyncThunk("user/fetchUserProfile", async () => {
  const response = await getProfileInfo();
  return response.data;
});

const fetchUserFollowing = createAsyncThunk(
  "user/fetchUserFollowing",
  async () => {
    const response = await getUserFollowing();
    return response.data.artists.items.length;
  }
);

const userSlice = createSlice({
  name: "userProfile",
  initialState: {
    data: [],
    followingCount: null,
    profileStatus: "idle",
    followerStatus: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.profileStatus = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profileStatus = "completed";
        state.data = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.profileStatus = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchUserFollowing.pending, (state) => {
        state.followerStatus = "loading";
      })
      .addCase(fetchUserFollowing.fulfilled, (state, action) => {
        state.followerStatus = "completed";
        state.followingCount = action.payload;
      })
      .addCase(fetchUserFollowing.rejected, (state, action) => {
        state.followerStatus = "rejected";
        state.error = action.error.message;
      });
  },
});

export { fetchUserProfile, fetchUserFollowing };

export default userSlice.reducer;

export const selectUser = (state) => state.user;
