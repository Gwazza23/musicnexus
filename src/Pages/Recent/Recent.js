import { useEffect } from "react";
import "./Recent.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRecentTracks, selectTracks } from "../../Slices/tracksSlice";
import { msToMinutesAndSeconds } from "../../Util/functions";

function Recent() {
  const dispatch = useDispatch();

  const recent = useSelector(selectTracks).recent.items;
  useEffect(() => {
    dispatch(fetchUserRecentTracks());
  }, [dispatch]);
  return (
    <div className="recent-page-container">
      <div className="recent-page-header">
        <h1>Recent</h1>
      </div>
      <div className="recent-page-div">
        {recent?.map((track) => {
          return (
            <div className="recent-page-card">
              <div className="recent-page-image-div">
                <img
                  src={track.track.album.images[0].url}
                  alt={track.track.name}
                />
              </div>
              <div className="recent-page-info-div">
                <h3>{track.track.name}</h3>
                <ul>
                  <li>
                    Artist: <span>{track.track.artists[0].name}</span>
                  </li>
                  <li>
                    Duration:
                    <span>
                      {msToMinutesAndSeconds(track.track.duration_ms)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Recent;
