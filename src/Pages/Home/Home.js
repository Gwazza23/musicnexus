import { useEffect } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserFollowing,
  fetchUserProfile,
  selectUser,
} from "../../Slices/userSlice";
import { fetchUserTopArtists, selectArtists } from "../../Slices/artistsSlice";
import {
  fetchRecommendedTrack,
  fetchUserTopTrack,
  selectTracks,
} from "../../Slices/tracksSlice";
import { getSeeds } from "../../Util/functions";
import {
  fetchUserPlaylists,
  selectPlaylists,
} from "../../Slices/playlistsSlice";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector(selectUser);
  const artists = useSelector(selectArtists).data?.items?.slice(0, 5);
  const tracks = useSelector(selectTracks).data?.items?.slice(0, 5);
  const playlists = useSelector(selectPlaylists).data?.items?.length;

  const artistIds = getSeeds(artists?.slice(0, 2));
  const trackIds = getSeeds(tracks?.slice(0, 2));

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchUserFollowing());
    dispatch(fetchUserPlaylists());
    dispatch(fetchUserTopArtists("long_term"));
    dispatch(fetchUserTopTrack("long_term"));
    dispatch(fetchRecommendedTrack([artistIds, trackIds]));
  }, [dispatch, artistIds, trackIds]);

  if (data.profileStatus === "loading") {
    return <h1>loading...</h1>;
  } else if (data.profileStatus === "completed") {
    return (
      <div className="home-page-container">
        <div className="home-profile-section">
          <div className="home-profile-name">
            <h1>
              {data.data.display_name}
              <span>.</span>
            </h1>
          </div>
          <div className="home-profile-icon">
            <img src={data.data.images[1].url} alt={data.data.display_name} />
          </div>
          <div className="home-profile-info">
            <p>
              Followers<span>{data.data.followers.total}</span>
            </p>
            <p>
              Following<span>{data.followingCount}</span>
            </p>
            <p>
              Playlists<span>{playlists}</span>
            </p>
          </div>
        </div>
        {tracks && (
          <div className="home-tracks-section">
            <div className="home-tracks-top">
              <h2>
                All Time Top Track<span>!</span>
              </h2>
              <div className="home-track-top-div">
                <img src={tracks[0].album.images[0].url} alt="top artist" />
                <h3>{tracks[0].name}</h3>
                <h4>{tracks[0].artists[0].name}</h4>
              </div>
            </div>
            <div className="home-tracks-list">
              {tracks.map((track, index) => {
                return (
                  <div
                    className="home-tracks-list-div"
                    key={track.id}
                    onClick={() => {
                      navigate(`/home/tracks/${track.id}`);
                    }}
                  >
                    <p>{index + 1}.</p>
                    <img src={track.album.images[1].url} alt={track.name} />
                    <h3>{track.name}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {artists && (
          <div className="home-artists-section">
            <div className="home-artists-list">
              {artists.map((artist, index) => {
                return (
                  <div
                    className="home-artists-list-div"
                    key={artist.id}
                    onClick={() => {
                      navigate(`/home/artists/${artists.id}`);
                    }}
                  >
                    <p>{index + 1}.</p>
                    <img
                      width="125px"
                      src={artist.images[0].url}
                      alt={artist.name}
                    />
                    <h3>{artist.name}</h3>
                  </div>
                );
              })}
            </div>
            <div className="home-artist-top">
              <h2>
                All Time Top Artist<span>!</span>
              </h2>
              <div className="home-artist-top-div">
                <img src={artists[0].images[0].url} alt="top artist" />
                <h3>{artists[0].name}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
