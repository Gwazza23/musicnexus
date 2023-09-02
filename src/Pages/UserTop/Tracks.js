import "./UserTop.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserTopTrack,
  selectTracks,
  fetchRecommendedTrack,
} from "../../Slices/tracksSlice";
import { useNavigate } from "react-router-dom";
import { getSeeds } from "../../Util/functions";

function Tracks() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sort, setSort] = useState("long_term");

  const tracks = useSelector(selectTracks).data?.items;
  const recommended = useSelector(selectTracks).recommended?.tracks?.slice(
    0,
    3
  );

  const seeds = getSeeds(tracks?.slice(0, 5));

  useEffect(() => {
    dispatch(fetchUserTopTrack(sort));
    dispatch(fetchRecommendedTrack(seeds));
  }, [dispatch, sort, seeds]);

  if (tracks?.length === 0) {
    return (
      <div className="error-container">
        <h2 className="error">Not enough data to provide your top tracks 😵</h2>
      </div>
    );
  }

  return (
    <div className="user-top-page-container">
      <div className="user-top-page-header">
        <h1>Top Tracks</h1>
        <div className="user-top-page-sort">
          <p
            className={sort === "long_term" ? "underline" : ""}
            onClick={() => setSort("long_term")}
          >
            All Time
          </p>
          <p
            className={sort === "medium_term" ? "underline" : ""}
            onClick={() => setSort("medium_term")}
          >
            Last 6 Months
          </p>
          <p
            className={sort === "short_term" ? "underline" : ""}
            onClick={() => setSort("short_term")}
          >
            Last 4 Weeks
          </p>
        </div>
      </div>
      <div className="user-top-page-div">
        {tracks?.map((track) => {
          return (
            <div
              className="user-top-page-card"
              key={track.id}
              onClick={() => {
                navigate(`/home/tracks/${track.id}`);
              }}
            >
              <div className="user-top-page-image-div">
                <img
                  src={track.album.images[2].url}
                  alt={track.name}
                  width={track.album.images[2].width}
                  height={track.album.images[2].height}
                />
              </div>
              <div className="user-top-page-info-div">
                <h3>{track.name}</h3>
                <ul>
                  <li>
                    <i>{track.album.name}</i>
                  </li>
                  <li>{track.artists[0]?.name}</li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
      <div className="user-top-page-reccom-container">
        <h2>Recommened Tracks</h2>
        <div className="user-top-page-reccom-div">
          {recommended &&
            recommended.map((track) => {
              return (
                <div
                  className="reccom-div"
                  onClick={() => {
                    navigate(`/home/tracks/${track.id}`);
                  }}
                >
                  <img src={track.album.images[1].url} alt={track.name} />
                  <h3>{track.name}</h3>
                  <h4>{track.artists[0].name}</h4>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Tracks;
