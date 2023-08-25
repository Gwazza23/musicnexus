import "./UserTop.css";
import "../../App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTopArtists, selectArtists } from "../../Slices/artistsSlice";
import { getSeeds } from "../../Util/functions";
import { useNavigate } from "react-router-dom";

function Artists() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sort, setSort] = useState("long_term");

  const artists = useSelector(selectArtists).data?.items;

  const seeds = getSeeds(artists?.slice(0, 5));

  useEffect(() => {
    dispatch(fetchUserTopArtists(sort));
  }, [dispatch, sort, seeds]);

  return (
    <div className="user-top-page-container">
      <div className="user-top-page-header">
        <h1>Top Artists</h1>
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
      <div className="user-top-page-div artist-page">
        {artists?.map((artist) => {
          return (
            <div
              className="user-top-page-card"
              key={artist.id}
              onClick={() => {
                navigate(`/home/artists/${artist.id}`);
              }}
            >
              <div className="user-top-page-image-div">
                <img src={artist.images[0].url} alt={artist.name} />
              </div>
              <div className="user-top-page-info-div">
                <h3>{artist.name}</h3>
                <ul>
                  {artist.genres.map((genre) => {
                    return <li>{genre}</li>;
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Artists;
