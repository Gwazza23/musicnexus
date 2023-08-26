import { useEffect, useState } from "react";
import "./Artist.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchArtistInfo,
  fetchArtistTopTracks,
  selectArtists,
} from "../../Slices/artistsSlice";
import { msToMinutesAndSeconds, shortenFollowers } from "../../Util/functions";
import { checkIfFollowing } from "../../Util/spotify";

function Artist() {
  const dispatch = useDispatch();
  const [following, setFollowing] = useState(null);

  const { id } = useParams();

  const artistInfo = useSelector(selectArtists)?.data;
  const artistTopTracks = useSelector(selectArtists)?.topTracks;
  console.log(artistTopTracks);

  useEffect(() => {
    dispatch(fetchArtistInfo(id));
    checkIfFollowing(id).then((response) => setFollowing(response?.data));
    dispatch(fetchArtistTopTracks(id));
  }, [dispatch, id]);
  return (
    artistInfo &&
    artistInfo.images && (
      <div className="artist-page-container">
        <div className="artist-page-header">
          <img src={artistInfo?.images[0]?.url} alt={artistInfo.name} />
          <div className="artist-page-header-info">
            <h1>
              {artistInfo.name}
              <span>.</span>
            </h1>
            <div className="artist-page-genre-div">
              {artistInfo.genres.map((genre, id) => {
                return (
                  <p className="artist-page-genre" key={id}>
                    {genre}
                  </p>
                );
              })}
            </div>
            <h3>{following && following[0] ? "Followed" : "Not Followed"}</h3>
            <a href={artistInfo.external_urls.spotify}>Spotify Page</a>
            <h3 id="followers">
              {shortenFollowers(artistInfo.followers.total)}{" "}
              <span> Followers</span>
            </h3>
          </div>
        </div>
        <div className="artist-page-info">
          <div className="artist-page-analysis"></div>
          <div className="artist-page-top-tracks">
            <h2>Top Tracks</h2>
            <div className="artist-page-track-container" >
              {artistTopTracks?.tracks?.map((tracks) => {
                return (
                  <div className="artist-page-top-track-div">
                    <img src={tracks.album.images[0].url} alt={tracks.name} />
                    <h3>{tracks.name}</h3>
                    <p>{msToMinutesAndSeconds(tracks.duration_ms)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Artist;
