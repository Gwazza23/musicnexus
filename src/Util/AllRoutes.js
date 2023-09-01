import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LandingPage from "../Pages/Landing/LandingPage";
import NavBar from "../Pages/NavBar/NavBar";
import Home from "../Pages/Home/Home";
import Artists from "../Pages/UserTop/Artists";
import Tracks from "../Pages/UserTop/Tracks";
import Recent from "../Pages/Recent/Recent";
import Playlists from "../Pages/Playlists/Playlists";
import Track from "../Pages/Track/Track";
import PlaylistPage from "../Pages/Playlists/PlaylistPage";
import Artist from "../Pages/Artist/Artist";

function AllRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<NavBar />}>
          <Route path="/home/" element={<Home />} />
          <Route path="/home/artists" element={<Artists />} />
          <Route path="/home/tracks" element={<Tracks />} />
          <Route path="/home/recent" element={<Recent />} />
          <Route path="/home/playlists" element={<Playlists />} />
          <Route path="/home/tracks/:id" element={<Track />} />
          <Route path="/home/playlist/:id" element={<PlaylistPage />} />
          <Route path="/home/artists/:id" element={<Artist />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default AllRoutes;
