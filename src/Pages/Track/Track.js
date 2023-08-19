import "./Track.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTrack, selectTracks } from "../../Slices/tracksSlice";
import { useDispatch, useSelector } from "react-redux";
import { msToMinutesAndSeconds } from "../../Util/functions";

function Track() {
  const dispatch = useDispatch();
  const track = useSelector(selectTracks)?.data;
  const { id } = useParams();

  console.log(track)
  useEffect(() => {
    dispatch(fetchTrack(id));
  }, [dispatch, id]);
  return (
    track && (
      <div className="track-page-container">
        <div className="track-page-header" >
            <img src={track.album?.images[0].url} alt={track.name} />
            <div className="track-page-info" >
                <h1>{track.name}</h1>
                <h3>{track.album?.name}</h3>
                <p>Artists: {track.artists?.map((artist) => {return <span>{artist.name}</span>})}</p>
                <p>Release Date:<span>{track.album?.release_date}</span></p>
                <p>Duration:<span>{msToMinutesAndSeconds(track.duration_ms)}</span></p>
            </div>
        </div>
      </div>
    )
  );
}

export default Track;
