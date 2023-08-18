import "./UserTop.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTopTrack, selectTracks } from "../../Slices/tracksSlice";

function Tracks() {
  const dispatch = useDispatch();

  const [sort, setSort] = useState("long_term");

  const tracks = useSelector(selectTracks).data?.items;

  useEffect(() => {
    dispatch(fetchUserTopTrack(sort));
  }, [dispatch, sort]);

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
            <div className="user-top-page-card" key={track.id}>
              <div className="user-top-page-image-div">
                <img src={track.album.images[0].url} alt={track.name} />
              </div>
              <div className="user-top-page-info-div">
                <h3>{track.name}</h3>
                <ul>
                  <li>{track.album.name}</li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Tracks;
