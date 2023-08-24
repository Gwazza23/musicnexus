import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getRecentlyPlayedTracks,
  getTrack,
  getTrackAnalysis,
  getTrackFeatures,
  getUserRecommendation,
  getUserTop,
} from "../Util/spotify";

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

const fetchTrack = createAsyncThunk("tracks/track", async (id) => {
  const response = await getTrack(id);
  return response.data;
});

const fetchRecommendedTrack = createAsyncThunk(
  "tracks/recommended",
  async (seeds) => {
    const response = await getUserRecommendation(seeds);
    return response.data;
  }
);

const fetchAudioFeatures = createAsyncThunk("tracks/features", async (id) => {
  const response = await getTrackFeatures(id);
  return response.data;
});

const fetchAudioAnalysis = createAsyncThunk("tracks/analysis", async (id) => {
  const response = await getTrackAnalysis(id);
  return response.data;
});

const tracksSlice = createSlice({
  name: "userTracks",
  initialState: {
    data: [],
    recommended: [],
    recent: [],
    features: [],
    analysis: [],
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
        state.status = "loading";
      })
      .addCase(fetchUserRecentTracks.fulfilled, (state, action) => {
        state.status = "completed";
        state.recent = action.payload;
      })
      .addCase(fetchUserRecentTracks.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchTrack.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTrack.fulfilled, (state, action) => {
        state.status = "completed";
        state.data = action.payload;
      })
      .addCase(fetchTrack.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchRecommendedTrack.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchRecommendedTrack.fulfilled, (state, action) => {
        state.status = "completed";
        state.recommended = action.payload;
      })
      .addCase(fetchRecommendedTrack.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchAudioFeatures.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAudioFeatures.fulfilled, (state, action) => {
        state.status = "completed";
        state.features = action.payload;
      })
      .addCase(fetchAudioFeatures.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchAudioAnalysis.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAudioAnalysis.fulfilled, (state, action) => {
        state.status = "completed";
        state.analysis = action.payload;
      })
      .addCase(fetchAudioAnalysis.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export {
  fetchUserTopTrack,
  fetchUserRecentTracks,
  fetchTrack,
  fetchRecommendedTrack,
  fetchAudioFeatures,
  fetchAudioAnalysis,
};

export default tracksSlice.reducer;

export const selectTracks = (state) => state.tracks;
