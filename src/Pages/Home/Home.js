import { useEffect } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserFollowing,
  fetchUserProfile,
  selectUser,
} from "../../Slices/userSlice";
import { fetchUserTopArtists, selectArtists } from "../../Slices/artistsSlice";
import { fetchUserTopTrack, selectTracks } from "../../Slices/tracksSlice";

function Home() {
  const dispatch = useDispatch();

  const data = useSelector(selectUser);
  const artists = useSelector(selectArtists).data?.data?.items?.slice(0, 5);
  const tracks = useSelector(selectTracks).data?.data?.items?.slice(0, 5);

  console.log(tracks);

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchUserFollowing());
    dispatch(fetchUserTopArtists("long_term"));
    dispatch(fetchUserTopTrack("long_term"));
  }, [dispatch]);

  if (data.profileStatus === "loading") {
    return <h1>loading...</h1>;
  } else if (data.profileStatus === "completed") {
    return (
      <div className="home-page-container">
        <div className="user-about-section">
          <img src={data.data.images[1].url} alt="profile" />
          <div className="user-info-section">
            <h2>{data.data.display_name}</h2>
            <div className="user-info">
              <div>
                <p>followers</p>
                <p>{data.data.followers.total}</p>
              </div>
              <div>
                <p>following</p>
                <p>{data.followingCount}</p>
              </div>
              <div>
                <p>playlists</p>
                <p>22</p>
              </div>
            </div>
          </div>
        </div>
        <div className="home-page-top-section">
          <div>
            <h2>Top Artists</h2>
            <div className="home-page-top-div">
              {artists?.map((artist) => {
                return (
                  <div className="home-page-top-card">
                    <img src={artist.images[0].url} alt={artist.name} />
                    <div className="home-page-top-info">
                      <h4>{artist.name}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h2>Top Tracks</h2>
            <div className="home-page-top-div">
              {tracks?.map((track) => {
                return (
                  <div className="home-page-top-card">
                    <img src={track.album.images[0].url} alt={track.name} />
                    <div className="home-page-top-info">
                      <h4>{track.name}</h4>
                      <h6>{track.artists[0].name}</h6>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
