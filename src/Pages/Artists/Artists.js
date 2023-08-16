import "./Artists.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTopArtists, selectArtists } from "../../Slices/artistsSlice";

function Artists() {
  const dispatch = useDispatch();

  const [sort, setSort] = useState("long_term");

  const artists = useSelector(selectArtists).data?.items;
  console.log(artists);

  useEffect(() => {
    dispatch(fetchUserTopArtists(sort));
  }, [dispatch, sort]);

  return (
    <div className="artist-page-container">
      <div className="artist-page-header">
        <h1>Top Artists</h1>
        <div className="artist-page-header-sort">
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
      <div className="artist-page-div">
        {artists?.map((artist) => {
          return (
            <div className="artist-page-card" key={artist.id}>
              <div className="artist-page-image-div">
                <img src={artist.images[0].url} alt={artist.name} />
              </div>
              <div className="artist-page-info-div">
                <h3>{artist.name}</h3>
                <ul>
                  {artist.genres.map((genre) => {
                    return (
                      <li>
                        {genre}
                      </li>
                    )
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
