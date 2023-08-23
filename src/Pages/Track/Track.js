import "./Track.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchAudioFeatures,
  fetchTrack,
  selectTracks,
} from "../../Slices/tracksSlice";
import { useDispatch, useSelector } from "react-redux";
import Player from "../../Util/Player";
import { convertKey } from "../../Util/functions";

function Track() {
  const dispatch = useDispatch();
  const track = useSelector(selectTracks)?.data;
  const features = useSelector(selectTracks);
  console.log(features);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchTrack(id));
    dispatch(fetchAudioFeatures(id));
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
                  <h4>{convertKey(features?.features?.track?.key)}</h4>
                  <p>Key</p>
                </td>
                <td>
                  <h4>
                    {features?.features?.track?.mode === 1 ? "Major" : "Minor"}
                  </h4>
                  <p>Modality</p>
                </td>
                <td>
                  <h4>{features?.features?.track?.time_signature}</h4>
                  <p>Time Signature</p>
                </td>
                <td>
                  <h4>{Math.round(features?.features?.track?.tempo)}</h4>
                  <p>Tempo (BPM) </p>
                </td>
              </tr>
              <tr>
                <td>
                  <h4>{features?.features?.bars?.length}</h4>
                  <p>Bars</p>
                </td>
                <td>
                  <h4>{features?.features?.beats?.length}</h4>
                  <p>Beats</p>
                </td>
                <td>
                  <h4>{features?.features?.sections?.length}</h4>
                  <p>Sections</p>
                </td>
                <td>
                  <h4>{features?.features?.segments?.length}</h4>
                  <p>Segments</p>
                </td>
              </tr>
            </table>
          )}
        </div>
      </div>
    )
  );
}

export default Track;
