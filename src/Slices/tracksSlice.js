import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRecentlyPlayedTracks, getUserTop } from "../Util/spotify";

const fetchUserTopTrack = createAsyncThunk(
  "tracks/topTracks",
  async (time_range) => {
    const response = await getUserTop("tracks", time_range);
    return response.data;
  }
);

const fetchUserRecentTracks = createAsyncThunk(
  "tracks/recentTracks",
  async () => {
    const response = await getRecentlyPlayedTracks();
    return response.data;
  }
);

const tracksSlice = createSlice({
  name: "userTracks",
  initialState: {
    data: [],
    recent: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTopTrack.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserTopTrack.fulfilled, (state, action) => {
        state.status = "completed";
        state.data = action.payload;
      })
      .addCase(fetchUserTopTrack.rejected, (state, action) => {
        state.status = "rejected";
        state.data = action.error.message;
      })
      .addCase(fetchUserRecentTracks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserRecentTracks.fulfilled, (state,action) => {
        state.status = 'completed'
        state.recent = action.payload
      })
      .addCase(fetchUserRecentTracks.rejected, (state,action) => {
        state.status = 'rejected'
        state.error = action.error.message
      })
  },
});

export { fetchUserTopTrack, fetchUserRecentTracks };

export default tracksSlice.reducer;

export const selectTracks = (state) => state.tracks;
