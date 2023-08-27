import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import {
  generateCodeChallenge,
  generateRandomString,
} from "../../Util/spotify";
import { useEffect } from "react";

function LandingPage() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const expiresAt = localStorage.getItem("expiresAt");

  const handleLogIn = async () => {
    const codeVerifier = generateRandomString(126);
    await generateCodeChallenge(codeVerifier).then((codeChallenge) => {
      let state = generateRandomString(16);
      let scope =
        "user-read-private user-read-email user-follow-read user-top-read user-read-recently-played playlist-read-private streaming user-read-playback-state user-modify-playback-state";

      localStorage.setItem("code_verifier", codeVerifier);

      let args = new URLSearchParams({
        response_type: "code",
        client_id: process.env.REACT_APP_CLIENT_ID,
        scope: scope,
        redirect_uri: process.env.REACT_APP_BUILD === 'development' ? "http://localhost:3000/callback" : 'https://musicnexus.netlify.app/callback',
        state: state,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
      });

      window.open("https://accounts.spotify.com/authorize?" + args, "_self");
    });
  };

  useEffect(() => {
    if( accessToken && expiresAt && Date.now() < expiresAt ){
      navigate('/home')
    }
  }, [accessToken,expiresAt,navigate])

  return (
    <div className="landing-page-container">
      <img src="/images/MusicNexus.png" alt="music nexus logo" />
      <div className="spotify-login" onClick={handleLogIn}>
        Log in with spotify
      </div>
    </div>
  );
}

export default LandingPage;
