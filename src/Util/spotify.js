import axios from "axios";

function retrieveAccessToken() {
  const accessToken = sessionStorage.getItem("accessToken");
  return accessToken;
}

/* 
 -----------  
|   oauth   |
 -----------
*/

function hasAccessTokenExpired() {
  const expiresAt = sessionStorage.getItem("expiresAt");
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
 -------------
|   artists   |
 -------------
*/

export async function getArtistInfo(id) {
  const accessToken = retrieveAccessToken();
  try {
    let url = `https://api.spotify.com/v1/artists/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching aritst info", error);
  }
}

export async function checkIfFollowing(id) {
  const accessToken = retrieveAccessToken();
  try {
    let url = `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error checking if user follows artist", error);
  }
}

export async function getArtistTopTracks(id) {
  const accessToken = retrieveAccessToken();
  try {
    let url = `https://api.spotify.com/v1/artists/${id}/top-tracks`;
    const response = await axios.get(url, {
      params: {
        country: "US",
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching artist top tracks", error);
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

export async function getPlaylist(id) {
  const accessToken = retrieveAccessToken();
  try {
    let url = `https://api.spotify.com/v1/playlists/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching playlist", error);
  }
}

export async function getPlaylistCoverImage(id) {
  const accessToken = retrieveAccessToken();
  try {
    let url = `https://api.spotify.com/v1/playlists/${id}/images`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching playlist cover image", error);
  }
}

export async function getPlaylistFeatures(ids) {
  console.log("am been caled");
  const accessToken = retrieveAccessToken();
  try {
    let url = `https://api.spotify.com/v1/audio-features?ids=${ids}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching playlist features", error);
  }
}
