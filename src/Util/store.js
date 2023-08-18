import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../Slices/userSlice";
import tracksReducer from "../Slices/tracksSlice";
import artistsReducer from "../Slices/artistsSlice";
import playlistsReducer from "../Slices/playlistsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    tracks: tracksReducer,
    artists: artistsReducer,
    playlists: playlistsReducer
  },
});

export default store;
