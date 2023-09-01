import { generateRandomString } from "../../Util/functions";
import "./LandingPage.css";

function LandingPage() {
  const handleClick = () => {
    const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const redirect_uri =
      process.env.REACT_APP_NODE_ENV === "development"
        ? "http://localhost:3000/callback"
        : "https://musicnexus.vercel.app/callback";

    const state = generateRandomString(16);

    localStorage.setItem("spotify_auth_state", state);

    const scope =
      "user-read-private user-read-email user-follow-read user-top-read user-read-recently-played playlist-read-private streaming user-read-playback-state user-modify-playback-state";

    var url = "https://accounts.spotify.com/authorize";

    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(client_id);
    url += "&scope=" + encodeURIComponent(scope);
    url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
    url += "&state=" + encodeURIComponent(state);

    window.location = url
  };

  return (
    <div className="landing-page-container">
      <img src="/images/MusicNexus.png" alt="music nexus logo" />
      <div className="spotify-login" onClick={handleClick}>
        Log in with spotify
      </div>
    </div>
  );
}

export default LandingPage;
