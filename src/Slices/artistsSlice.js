import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getArtistInfo, getUserTop } from "../Util/spotify";

const fetchUserTopArtists = createAsyncThunk(
  "artists/topArtists",
  async (time_range) => {
    const response = await getUserTop("artists", time_range);
    return response.data;
  }
);

const fetchArtistInfo = createAsyncThunk("artists/info", async (id) => {
  const response = await getArtistInfo(id);
  return response.data;
});

const artistsSlice = createSlice({
  name: "userArtists",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTopArtists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserTopArtists.fulfilled, (state, action) => {
        state.status = "completed";
        state.data = action.payload;
      })
      .addCase(fetchUserTopArtists.rejected, (state, action) => {
        state.status = "rejected";
        state.data = action.error.message;
      })
      .addCase(fetchArtistInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArtistInfo.fulfilled, (state, action) => {
        state.status = "completed";
        state.data = action.payload;
      })
      .addCase(fetchArtistInfo.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export { fetchUserTopArtists, fetchArtistInfo };

export default artistsSlice.reducer;

export const selectArtists = (state) => state.artists;
