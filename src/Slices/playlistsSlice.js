import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getPlaylist,
  getPlaylistFeatures,
  getUserPlaylists,
} from "../Util/spotify";

const fetchUserPlaylists = createAsyncThunk(
  "playlists/userPlaylists",
  async () => {
    const response = await getUserPlaylists();
    return response.data;
  }
);

const fetchPlaylist = createAsyncThunk("playlists/playlist", async (id) => {
  const response = await getPlaylist(id);
  return response.data;
});

const fetchPlaylistFeatures = createAsyncThunk(
  "playlist/features",
  async (ids) => {
    const response = await getPlaylistFeatures(ids);
    return response.data;
  }
);

const playlistSlice = createSlice({
  name: "userPlaylists",
  initialState: {
    data: [],
    features: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPlaylists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserPlaylists.fulfilled, (state, action) => {
        state.status = "completed";
        state.data = action.payload;
      })
      .addCase(fetchUserPlaylists.rejected, (state, action) => {
        state.status = "rejected";
        state.data = action.error.message;
      })
      .addCase(fetchPlaylist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlaylist.fulfilled, (state, action) => {
        state.status = "completed";
        state.data = action.payload;
      })
      .addCase(fetchPlaylist.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchPlaylistFeatures.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlaylistFeatures.fulfilled, (state, action) => {
        state.status = "completed";
        state.features = action.payload;
      })
      .addCase(fetchPlaylistFeatures.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export { fetchUserPlaylists, fetchPlaylist, fetchPlaylistFeatures };

export default playlistSlice.reducer;

export const selectPlaylists = (state) => state.playlists;
