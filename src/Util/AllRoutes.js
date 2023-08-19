import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LandingPage from "../Pages/Landing/LandingPage";
import Callback from "../Pages/Callback/Callback";
import NavBar from "../Pages/NavBar/NavBar";
import Home from "../Pages/Home/Home";
import Artists from "../Pages/UserTop/Artists";
import Tracks from "../Pages/UserTop/Tracks";
import Recent from "../Pages/Recent/Recent";
import Playlists from "../Pages/Playlists/Playlists";
import Track from "../Pages/Track/Track";

function AllRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/home" element={<NavBar />}>
          <Route path="/home/profile" element={<Home />} />
          <Route path="/home/artists" element={<Artists />} />
          <Route path="/home/tracks" element={<Tracks />} />
          <Route path="/home/recent" element={<Recent />} />
          <Route path="/home/playlists" element={<Playlists />} />
          <Route path="/home/tracks/:id" element={<Track />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default AllRoutes;
