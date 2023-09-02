import "./NavBar.css";
import { MdReplay } from "react-icons/md";
import { GiMicrophone } from "react-icons/gi";
import { PiMusicNotesFill, PiPlaylistFill } from "react-icons/pi";
import { BiExit } from "react-icons/bi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../Slices/tokenSlice";
import { useEffect } from "react";

function NavBar() {
  const accessToken = (useSelector(selectToken).accessToken);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("spotify_auth_state")
    navigate("/");
  };

  useEffect(() => {
    if(accessToken){
      localStorage.setItem('accessToken',accessToken)
    }
  }, [accessToken]);

  return (
    <>
      <nav>
        <div className="nav-links">
          <NavLink to="/home">
            <img src={"/images/logoSmall.png"} alt="home page" />
          </NavLink>
          <NavLink to="/home/artists">
            <GiMicrophone />
            <p>Top Artists</p>
          </NavLink>
          <NavLink to="/home/tracks">
            <PiMusicNotesFill />
            <p>Top Tracks</p>
          </NavLink>
          <NavLink to="/home/recent">
            <MdReplay />
            <p>Recent</p>
          </NavLink>
          <NavLink to="/home/playlists">
            <PiPlaylistFill />
            <p>Playlists</p>
          </NavLink>
          <div onClick={handleLogout}>
            <BiExit />
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
