import { useEffect, useState } from "react";
import "./PlaylistPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPlaylist,
  fetchPlaylistFeatures,
  selectPlaylists,
} from "../../Slices/playlistsSlice";
import { getPlaylistCoverImage } from "../../Util/spotify";
import {
  chartLabels,
  chartOptions,
  getFeaturesAverage,
  getIds,
  getPlaylistDuration,
} from "../../Util/functions";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { msToMinutesAndSeconds, chartColors } from "../../Util/functions";

function PlaylistPage() {
  const [smallScreen, setSmallScreen] = useState(false);
  const [coverImage, setCoverImage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const playlist = useSelector(selectPlaylists)?.data;
  const playlistFeatures =
    useSelector(selectPlaylists)?.features?.audio_features;

  const playlistDuration = getPlaylistDuration(playlist);

  Chart.register(...registerables);

  const features = getFeaturesAverage(playlistFeatures);

  const state = {
    labels: chartLabels,
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
          features?.acousticness * 100,
          features?.danceability * 100,
          features?.energy * 100,
          features?.instrumentalness * 100,
          features?.liveness * 100,
          features?.speechiness * 100,
          features?.valence * 100,
        ],
      },
    ],
  };

  const ids = getIds(playlist.tracks?.items);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth <= 425);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchPlaylist(id));
    dispatch(fetchPlaylistFeatures(ids));
    getPlaylistCoverImage(id).then((response) =>
      setCoverImage(response.data[0])
    );
  }, [dispatch, id, ids]);

  return (
    playlist && (
      <div className="playlist-page-container">
        <div className="playlist-page-section-one">
          <div className="playlist-page-header">
            <h2>{playlist.name}</h2>
            <img src={coverImage?.url} alt={playlist.name} />
            <div className="playlist-page-header-info">
              {playlist.description && <h3>{playlist.description}</h3>}
              <table>
                <tr>
                  <td>
                    <h4>{playlist.owner?.display_name}</h4>
                    <p>Created By</p>
                  </td>
                  <td>
                    <h4>{playlist.followers?.total}</h4>
                    <p>Followers</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>{playlist.tracks?.items?.length}</h4>
                    <p>Tracks</p>
                  </td>
                  <td>
                    <h4>{msToMinutesAndSeconds(playlistDuration)}</h4>
                    <p>Duration</p>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="playlist-page-features">
            <h2>Playlist Analysis</h2>
            {smallScreen ? (
              <Doughnut data={state} options={chartOptions}></Doughnut>
            ) : (
              <Bar data={state} options={chartOptions}></Bar>
            )}
          </div>
        </div>
        <div className="playlist-page-section-two">
          <div className="playlist-page-list-container">
            {playlist?.tracks?.items?.map((item) => {
              return (
                <div
                  className="playlist-page-track-div"
                  onClick={() => {
                    navigate(`/home/tracks/${item.track.id}`);
                  }}
                >
                  <img
                    src={item.track.album.images[0].url}
                    alt={item.track.name}
                  />
                  <div className="playlist-page-track-div-info">
                    <h2>{item.track.name}</h2>
                    <div className="playlist-page-track-div-artists">
                      {item.track.artists.map((artist) => {
                        return <h3>{artist.name}</h3>;
                      })}
                    </div>
                    <h3>{item.track.album.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
}

export default PlaylistPage;
