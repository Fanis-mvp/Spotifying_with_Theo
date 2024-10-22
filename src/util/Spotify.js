let accessToken = "";
const clientID = "19ebdf03252e4474b81f35d8f8d4dcd5";
const redirectUrl = "https://spotifying-with-theo.netlify.app/";

const Spotify = {
  getAccessToken() {
    // Check if access token is already stored in sessionStorage
    const storedToken = sessionStorage.getItem("spotify_access_token");
    const storedExpiration = sessionStorage.getItem("spotify_token_expires");

    if (storedToken && storedExpiration && new Date().getTime() < storedExpiration) {
      accessToken = storedToken;
      return accessToken;
    }

    const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
    const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenInURL && expiryTime) {
      accessToken = tokenInURL[1];
      const expiresIn = Number(expiryTime[1]);

      // Store the access token and expiration time in sessionStorage
      sessionStorage.setItem("spotify_access_token", accessToken);
      sessionStorage.setItem("spotify_token_expires", new Date().getTime() + expiresIn * 1000);

      // Clear the access token after the expiration time
      window.setTimeout(() => sessionStorage.removeItem("spotify_access_token"), expiresIn * 1000);

      // Remove the token and expiration parameters from the URL
      window.history.pushState("Access token", null, "/");

      return accessToken;
    }

    // Redirect the user to Spotify's authorization page
    const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
    window.location = redirect;
  },

  async search(term) {
    accessToken = Spotify.getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const jsonResponse = await response.json();
    if (!jsonResponse || !jsonResponse.tracks || !jsonResponse.tracks.items) {
      console.error("Invalid response structure!");
    }
    return jsonResponse.tracks.items.map((t) => ({
      id: t.id,
      name: t.name,
      artist: t.artists[0].name,
      album: t.album.name,
      uri: t.uri,
      previewUrl: t.preview_url,
    }));
  },

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris) return;
    const aToken = Spotify.getAccessToken();
    const header = { Authorization: `Bearer ${aToken}` };

    try {
      const userResponse = await fetch("https://api.spotify.com/v1/me", {
        headers: header,
      });
      const userData = await userResponse.json();
      const userId = userData.id;

      const playlistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers: header,
          method: "POST",
          body: JSON.stringify({ name: name }),
        }
      );
      const playlistData = await playlistResponse.json();
      const playlistId = playlistData.id;

      await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: header,
        method: "POST",
        body: JSON.stringify({ uris: trackUris }),
      });
    } catch (error) {
      console.error("Error saving playlist:", error);
    }
  },

  
};

export default Spotify;
