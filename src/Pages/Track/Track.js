import "./Track.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTrack, selectTracks } from "../../Slices/tracksSlice";
import { useDispatch, useSelector } from "react-redux";
import Player from "../../Util/Player";

function Track() {
  const dispatch = useDispatch();
  const track = useSelector(selectTracks)?.data;
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchTrack(id));
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
              <Player uri={track.uri}/>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Track;
