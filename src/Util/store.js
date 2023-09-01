import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../Slices/userSlice";
import tracksReducer from "../Slices/tracksSlice";
import artistsReducer from "../Slices/artistsSlice";
import playlistsReducer from "../Slices/playlistsSlice";
import accessTokenReducer from '../Slices/tokenSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    tracks: tracksReducer,
    artists: artistsReducer,
    playlists: playlistsReducer,
    accessToken: accessTokenReducer
  },
});

export default store;
