import "./Playlists.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserPlaylists,
  selectPlaylists,
} from "../../Slices/playlistsSlice";

function Playlists() {
  const dispatch = useDispatch();
  const playlists = useSelector(selectPlaylists).data?.items;

  useEffect(() => {
    dispatch(fetchUserPlaylists());
  }, [dispatch]);
  return (
    <div className="playlists-page-container">
      <div className="playlists-page-header">
        <h1>Playlists</h1>
      </div>
      <div className="playlists-page-div">
        {playlists?.map((playlist) => {
          return (
            <div className="playlists-page-card" key={playlist.id}>
              <div className="playlists-page-image-div">
                <img src={playlist.images[0].url} alt={playlist.name} />
              </div>
              <div className="playlists-page-info-div">
                <h3>{playlist.name}</h3>
                <ul>
                  <li>
                    By: <span>{playlist.owner.display_name}</span>
                  </li>
                  <li>
                    Tracks : <span>{playlist.tracks.total}</span>
                  </li>
                  <li>{playlist.public ? "Public" : "Private"}</li>
                  <li style={{ fontSize: "0.75rem" }}>
                    <span>{playlist.description}</span>
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

export default Playlists;
