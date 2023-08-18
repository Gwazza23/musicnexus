import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LandingPage from "../Pages/Landing/LandingPage";
import Callback from "../Pages/Callback/Callback";
import NavBar from "../Pages/NavBar/NavBar";
import Home from "../Pages/Home/Home";
import Artists from "../Pages/UserTop/Artists";
import Tracks from "../Pages/UserTop/Tracks";

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
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default AllRoutes;
