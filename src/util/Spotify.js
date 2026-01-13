const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

let accessToken;

// Generate random string for PKCE
function generateRandomString(length) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], '');
}

// Generate code challenge from verifier using SHA-256
async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

const Spotify = {
  async authorize() {
    const codeVerifier = generateRandomString(64);
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    // Store code verifier for later token exchange
    localStorage.setItem('code_verifier', codeVerifier);

    const scope = 'playlist-modify-public';
    const authUrl = new URL('https://accounts.spotify.com/authorize');
    const params = {
      client_id: clientId,
      response_type: 'code',
      redirect_uri: redirectUri,
      scope: scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  },

  async getAccessToken() {
    // Return token if we already have it
    if (accessToken) {
      return accessToken;
    }

    // Check if we have a stored token
    const storedToken = localStorage.getItem('access_token');
    const tokenExpiry = localStorage.getItem('token_expiry');

    if (storedToken && tokenExpiry && Date.now() < Number(tokenExpiry)) {
      accessToken = storedToken;
      return accessToken;
    }

    // Check if authorization code is in URL (after redirect from Spotify)
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      const codeVerifier = localStorage.getItem('code_verifier');

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          client_id: clientId,
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier
        })
      });

      const data = await response.json();

      if (data.access_token) {
        accessToken = data.access_token;
        const expiresIn = data.expires_in * 1000; // Convert to milliseconds

        // Store token and expiry
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('token_expiry', Date.now() + expiresIn);

        // Clean up
        localStorage.removeItem('code_verifier');
        window.history.pushState({}, null, '/');

        return accessToken;
      }
    }

    // No token available - need to authorize
    return null;
  },

  async search(term) {
    const token = await Spotify.getAccessToken();

    if (!token) {
      await Spotify.authorize();
      return [];
    }

    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const jsonResponse = await response.json();

    if (!jsonResponse.tracks) {
      return [];
    }

    return jsonResponse.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri
    }));
  },

  async savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris.length) {
      return;
    }

    const token = await Spotify.getAccessToken();

    if (!token) {
      await Spotify.authorize();
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    // Get user ID
    const userResponse = await fetch('https://api.spotify.com/v1/me', { headers });
    const userData = await userResponse.json();
    const userId = userData.id;

    // Create new playlist
    const createPlaylistResponse = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name: playlistName })
      }
    );

    const playlistData = await createPlaylistResponse.json();
    const playlistId = playlistData.id;

    // Add tracks to playlist
    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ uris: trackUris })
    });
  },

  logout() {
    accessToken = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_expiry');
    localStorage.removeItem('code_verifier');
  }
};

export default Spotify;
