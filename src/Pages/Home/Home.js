import { useEffect } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserFollowing,
  fetchUserProfile,
  selectUser,
} from "../../Slices/userSlice";

function Home() {
  const dispatch = useDispatch();

  const data = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchUserFollowing());
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
      </div>
    );
  }
}

export default Home;
