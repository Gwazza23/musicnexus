import "./Track.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchAudioAnalysis,
  fetchAudioFeatures,
  fetchTrack,
  selectTracks,
} from "../../Slices/tracksSlice";
import { useDispatch, useSelector } from "react-redux";
import Player from "../../Util/Player";
import { chartOptions, chartColors ,convertKey, msToMinutesAndSeconds } from "../../Util/functions";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

function Track() {
  const [smallScreen, setSmallScreen] = useState(false);
  const dispatch = useDispatch();

  const track = useSelector(selectTracks)?.data;
  const features = useSelector(selectTracks)?.features;
  const analysis = useSelector(selectTracks)?.analysis;

  Chart.register(...registerables);

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

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
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
    dispatch(fetchTrack(id));
    dispatch(fetchAudioFeatures(id));
    dispatch(fetchAudioAnalysis(id));
  }, [dispatch, id]);

  return (
    track && (
      <div className="track-page-container">
        <div className="track-page-header">
          <img
            src={track.album?.images[0].url}
            alt={track.name + " cover art"}
          />
          <div className="track-page-header-info">
            <h2>{track.name}</h2>
            <h3>{track.album?.name}</h3>
            <span className="track-page-artists">
              {track.artists?.map((artist) => (
                <h3 key={artist.id}>{artist.name}</h3>
              ))}
            </span>
            <div className="track-page-playback">
              <Player uri={track.uri} />
            </div>
            <h3>{msToMinutesAndSeconds(track.duration_ms)}</h3>
            <a
              href={track.external_urls?.spotify}
              target="_blank"
              rel="noreferrer"
            >
              Spotify Page
            </a>
          </div>
        </div>
        <div className="track-page-features">
          <h2>Track Features</h2>
          {features && (
            <table>
              <tr>
                <td>
                  <h4>{convertKey(features?.track?.key)}</h4>
                  <p>Key</p>
                </td>
                <td>
                  <h4>{features?.track?.mode === 1 ? "Major" : "Minor"}</h4>
                  <p>Modality</p>
                </td>
                <td>
                  <h4>{features?.track?.time_signature}</h4>
                  <p>Time Signature</p>
                </td>
                <td>
                  <h4>{Math.round(features?.track?.tempo)}</h4>
                  <p>Tempo (BPM) </p>
                </td>
              </tr>
              <tr>
                <td>
                  <h4>{features?.bars?.length}</h4>
                  <p>Bars</p>
                </td>
                <td>
                  <h4>{features?.beats?.length}</h4>
                  <p>Beats</p>
                </td>
                <td>
                  <h4>{features?.sections?.length}</h4>
                  <p>Sections</p>
                </td>
                <td>
                  <h4>{features?.segments?.length}</h4>
                  <p>Segments</p>
                </td>
              </tr>
            </table>
          )}
        </div>
        <div className="track-page-analysis">
          <h2>Track Analysis</h2>
          {smallScreen ? (
            <Doughnut data={state} options={chartOptions}></Doughnut>
          ) : (
            <Bar data={state} options={chartOptions}></Bar>
          )}
        </div>
      </div>
    )
  );
}

export default Track;
