import { SpotifyTrack } from "@/types/spotify";
import { SPOTIFY_ENDPOINTS } from "@/constants/api-endpoints";

const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

const basic = btoa(`${client_id}:${client_secret}`);

const {
  TOKEN: TOKEN_ENDPOINT,
  NOW_PLAYING: NOW_PLAYING_ENDPOINT,
  RECENTLY_PLAYED: RECENTLY_PLAYED_ENDPOINT,
  USER: USER_ENDPOINT,
} = SPOTIFY_ENDPOINTS;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

export const getNowPlaying = async (): Promise<SpotifyTrack | null> => {
  try {
    const { access_token } = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status === 204 || response.status > 400) {
      return await getRecentlyPlayed(access_token);
    }

    const song = await response.json();

    if (song.currently_playing_type !== "track") {
      return await getRecentlyPlayed(access_token);
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist: any) => _artist.name).join(", ");
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;
    const duration = song.item.duration_ms;
    const progress = song.progress_ms;

    return {
      isPlaying,
      title,
      artist,
      album,
      albumImageUrl,
      songUrl,
      duration,
      progress,
    };
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    return null;
  }
};

const getRecentlyPlayed = async (access_token: string): Promise<SpotifyTrack | null> => {
  try {
    const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status === 204 || response.status > 400) {
      return null;
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) return null;

    const item = data.items[0];
    const track = item.track;

    return {
      isPlaying: false,
      title: track.name,
      artist: track.artists.map((_artist: any) => _artist.name).join(", "),
      album: track.album.name,
      albumImageUrl: track.album.images[0].url,
      songUrl: track.external_urls.spotify,
      duration: track.duration_ms,
      progress: 0,
    };
  } catch (error) {
    console.error("Error fetching Recently Played:", error);
    return null;
  }
};

export const getSpotifyProfileUrl = async (): Promise<string> => {
  try {
    const { access_token } = await getAccessToken();

    const response = await fetch(USER_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status > 400) {
      return "https://open.spotify.com/";
    }

    const user = await response.json();
    return user.external_urls.spotify;
  } catch (error) {
    console.error("Error fetching Spotify User:", error);
    return "https://open.spotify.com/";
  }
};
