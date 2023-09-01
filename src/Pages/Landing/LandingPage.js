import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

function LandingPage() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const expiresAt = localStorage.getItem("expiresAt");

  const redirect_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/spotify/login"
      : "https://musicnexusbackend.vercel.app/spotify/login";

  useEffect(() => {
    if (accessToken && expiresAt && Date.now() < expiresAt) {
      navigate("/home");
    }
  }, [accessToken, expiresAt, navigate]);

  return (
    <div className="landing-page-container">
      <img src="/images/MusicNexus.png" alt="music nexus logo" />
      <a className="spotify-login" href={redirect_url}>
        Log in with spotify
      </a>
    </div>
  );
}

export default LandingPage;
