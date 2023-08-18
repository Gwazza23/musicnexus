import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserPlaylists } from "../Util/spotify";

const fetchUserPlaylists = createAsyncThunk(
  "playlists/userPlaylists",
  async () => {
    const response = await getUserPlaylists();
    return response.data;
  }
);

const playlistSlice = createSlice({
  name: "userPlaylists",
  initialState: {
    data: [],
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
      });
  },
});


export { fetchUserPlaylists }

export default playlistSlice.reducer

export const selectPlaylists = (state) => state.playlists