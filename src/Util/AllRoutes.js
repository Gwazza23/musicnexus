import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LandingPage from "../Pages/Landing/LandingPage";
import Callback from "../Pages/Callback/Callback";

function AllRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AllRoutes;
