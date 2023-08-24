import axios from "axios";

const client_id = process.env.REACT_APP_CLIENT_ID;
const redirect_uri = "http://localhost:3000/callback";

function retrieveAccessToken() {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
}

/* 
 -----------  
|   oauth   |
 -----------
*/

export function generateRandomString(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export async function generateCodeChallenge(codeVerifier) {
  function base64encode(string) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);

  return base64encode(digest);
}

export async function getAccessToken(code, codeVerifier) {
  try {
    const data = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri,
      client_id,
      code_verifier: codeVerifier,
    });
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const accessToken = response.data.access_token;
    const expiresAt = Date.now() + response.data.expires_in * 1000;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("expiresAt", expiresAt);
    return response.status;
  } catch (error) {
    console.error("Error", error);
  }
}

function hasAccessTokenExpired() {
  const expiresAt = localStorage.getItem("expiresAt");
  return Date.now() > expiresAt;
}

function redirectUserToLoginPage() {
  if (hasAccessTokenExpired()) {
    console.log("token has expired");
    window.open("/", "_self");
  } else {
    console.log("token has not expired");
  }
}

setInterval(redirectUserToLoginPage, 1 * 60 * 1000);

/* 
 --------------  
|   userInfo   |
 --------------
*/

export async function getProfileInfo() {
  const accessToken = retrieveAccessToken();
  try {
    let url = "https://api.spotify.com/v1/me";
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching profileInfo", error);
  }
}

export async function getUserFollowing() {
  const accessToken = retrieveAccessToken();
  try {
    let url = "https://api.spotify.com/v1/me/following?type=artist";
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching playlists", error);
  }
}

export async function getUserTop(type, time_range) {
  const accessToken = retrieveAccessToken();
  try {
    let url = `https://api.spotify.com/v1/me/top/${type}?time_range=${time_range}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error(`Error fetching top ${type}`, error);
  }
}

export async function getUserRecommendation(seeds) {
  const accessToken = retrieveAccessToken();
  try {
    let url = `https://api.spotify.com/v1/recommendations?seed_tracks=${seeds}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error(`Error fetching recommendations`, error);
    throw error;
  }
}

/* 
 ------------ 
|   tracks   |
 ------------
*/

export async function getRecentlyPlayedTracks() {
  const accessToken = retrieveAccessToken();
  try {
    let url = `https://api.spotify.com/v1/me/player/recently-played`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching recently played tracks", error);
  }
}

export async function getTrack(id) {
  const accessToken = retrieveAccessToken();
  try {
    let url = `https://api.spotify.com/v1/tracks/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching track information", error);
  }
}

export async function getTrackFeatures(id) {
  const accessToken = retrieveAccessToken();
  try {
    let url = `https://api.spotify.com/v1/audio-analysis/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching track features", error);
  }
}

export async function getTrackAnalysis(id) {
  const accessToken = retrieveAccessToken();
  try {
    let url = `https://api.spotify.com/v1/audio-features/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching track analysis", error);
  }
}

/* 
 ---------------
|   playlists   |
 ---------------
*/

export async function getUserPlaylists() {
  const accessToken = retrieveAccessToken();
  try {
    let url = `https://api.spotify.com/v1/me/playlists`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching user playlists", error);
  }
}

/* 
 --------------
|   playback   |
 --------------
*/

export async function getPlaybackState() {
  const accessToken = retrieveAccessToken();
  try {
    let url = `https://api.spotify.com/v1/me/player`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching user playlists", error);
  }
}

export async function getAvailableDevices() {
  const accessToken = retrieveAccessToken();
  try {
    let url = `https://api.spotify.com/v1/me/player/devices`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching user playlists", error);
  }
}
