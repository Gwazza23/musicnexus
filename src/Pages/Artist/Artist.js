import { useEffect, useState } from "react";
import "./Artist.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchArtistInfo,
  fetchArtistTopTracks,
  selectArtists,
} from "../../Slices/artistsSlice";
import {
  chartOptions,
  getArtistTrackIds,
  getFeaturesAverage,
  msToMinutesAndSeconds,
  shortenFollowers,
  chartColors,
} from "../../Util/functions";
import { checkIfFollowing } from "../../Util/spotify";
import {
  fetchPlaylistFeatures,
  selectPlaylists,
} from "../../Slices/playlistsSlice";
import { Chart, registerables } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

function Artist() {
  const dispatch = useDispatch();
  const [following, setFollowing] = useState(null);
  const [smallScreen, setSmallScreen] = useState(false);

  const { id } = useParams();

  const artistInfo = useSelector(selectArtists)?.data;
  const artistTopTracks = useSelector(selectArtists)?.topTracks;
  const artistAnalysis = useSelector(selectPlaylists)?.features?.audio_features;

  Chart.register(...registerables);

  const ids = getArtistTrackIds(artistTopTracks?.tracks);
  const analysis = getFeaturesAverage(artistAnalysis);

  const state = {
    labels: [
      "acousticness",
      "danceability",
      "energy",
      "instrumentalness",
      "liveness",
      "speechiness",
      "valence",
    ],
    datasets: [
      {
        legend: {
          display: false,
        },
        hoverBackgroundColor: chartColors[0],
        borderColor: chartColors[0],
        borderWidth: 3,
        backgroundColor: chartColors[1],
        data: [
          analysis?.acousticness * 100,
          analysis?.danceability * 100,
          analysis?.energy * 100,
          analysis?.instrumentalness * 100,
          analysis?.liveness * 100,
          analysis?.speechiness * 100,
          analysis?.valence * 100,
        ],
      },
    ],
  };

  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchArtistInfo(id));
    checkIfFollowing(id).then((response) => setFollowing(response?.data));
    dispatch(fetchArtistTopTracks(id));
    dispatch(fetchPlaylistFeatures(ids));
  }, [dispatch, id, ids]);
  
  return (
    artistInfo &&
    artistInfo.images && (
      <div className="artist-page-container">
        <div className="artist-page-header">
          <img src={artistInfo?.images[0]?.url} alt={artistInfo.name} />
          <div className="artist-page-header-info">
            <h1>
              {artistInfo.name}
              <span>.</span>
            </h1>
            <div className="artist-page-genre-div">
              {artistInfo.genres.map((genre, id) => {
                return (
                  <p className="artist-page-genre" key={id}>
                    {genre}
                  </p>
                );
              })}
            </div>
            <h3>{following && following[0] ? "Followed" : "Not Followed"}</h3>
            <a href={artistInfo.external_urls.spotify}>Spotify Page</a>
            <h3 id="followers">
              {shortenFollowers(artistInfo.followers.total)}
              <span> Followers</span>
            </h3>
          </div>
        </div>
        <div className="artist-page-info">
          <div className="artist-page-analysis">
            <h2>Artist Analysis</h2>
              {smallScreen ? (
                <Doughnut className="graph" data={state} options={chartOptions}></Doughnut>
              ) : (
                <Bar className="graph" data={state} options={chartOptions} />
              )}
          </div>
          <div className="artist-page-top-tracks">
            <h2>Top Tracks</h2>
            <div className="artist-page-track-container">
              {artistTopTracks?.tracks?.map((tracks) => {
                return (
                  <div className="artist-page-top-track-div" key={tracks.id}>
                    <img src={tracks.album.images[0].url} alt={tracks.name} />
                    <h3>{tracks.name}</h3>
                    <p>{msToMinutesAndSeconds(tracks.duration_ms)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Artist;
