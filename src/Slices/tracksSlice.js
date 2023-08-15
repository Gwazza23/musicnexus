import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserTop } from "../Util/spotify";

const fetchUserTopTrack = createAsyncThunk(
  "tracks/topTracks",
  async (time_range) => {
    const response = await getUserTop("tracks", time_range);
    return response;
  }
);

const tracksSlice = createSlice({
  name: "userTracks",
  initialState: {
    data: [],
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
      });
  },
});

export { fetchUserTopTrack };

export default tracksSlice.reducer;

export const selectTracks = (state) => state.tracks;
