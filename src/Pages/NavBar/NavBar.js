import "./NavBar.css";
import { MdReplay } from "react-icons/md";
import { GiMicrophone } from "react-icons/gi";
import { PiMusicNotesFill, PiPlaylistFill } from "react-icons/pi";
import { BiExit } from "react-icons/bi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function NavBar() {
  const navigate = useNavigate();

  const backendURL =
    process.env.REACT_APP_NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://musicnexusbackend.vercel.app";

  const handleLogout = () => {
    axios
      .get(`${backendURL}/spotify/logout`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 202) {
          localStorage.removeItem("accessToken");
          navigate("/");
        }
      });
  };

  useEffect(() => {
    const getToken = async () => {
      const response = await axios.get(`${backendURL}/spotify/isLogged`, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("expiresAt", response.data.expires_at);
    };
    getToken();
  }, [backendURL, navigate]);

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
