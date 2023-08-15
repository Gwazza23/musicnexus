import "./Artists.css";
import { useState } from "react";

function Artists() {
  const [sort, setSort] = useState("long_term");

  return (
    <div className="artist-page-container">
      <div className="artist-page-header">
        <h1>Top Artists</h1>
        <div className="artist-page-header-sort">
          <p
            className={sort === "long_term" && "underline"}
            onClick={() => setSort("long_term")}
          >
            All Time
          </p>
          <p
            className={sort === "medium_term" && "underline"}
            onClick={() => setSort("medium_term")}
          >
            Last 6 Months
          </p>
          <p
            className={sort === "short_term" && "underline"}
            onClick={() => setSort("short_term")}
          >
            Last 4 Weeks
          </p>
        </div>
      </div>
    </div>
  );
}

export default Artists;
