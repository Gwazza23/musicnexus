import "./NavBar.css";
import { MdReplay } from "react-icons/md";
import { GiMicrophone } from "react-icons/gi";
import { PiMusicNotesFill, PiPlaylistFill } from "react-icons/pi";
import { BiSolidUser, BiExit } from "react-icons/bi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function NavBar() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiresAt");
    navigate("/");
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);
  return (
    <>
      <nav>
        <div className="nav-links">
          <NavLink to="/home">
            <BiSolidUser />
            <p>Profile</p>
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
            <p>Log out</p>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
