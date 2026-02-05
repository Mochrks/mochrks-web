import { SpotifyTrack } from "@/types/spotify";

export const MOCK_SPOTIFY_PLAYLIST: SpotifyTrack[] = [
  {
    isPlaying: true,
    title: "You're Not Alone",
    artist: "Saosin",
    album: "Saosin",
    albumImageUrl: null,
    songUrl: "https://open.spotify.com/track/7cITfGsdjGaTP0b5oiLL0z?si=b5f66f3f4720440e",
    duration: 208000,
    progress: 120000,
  },
  {
    isPlaying: true,
    title: "Only One",
    artist: "Yellowcard",
    album: "Ocean Avenue",
    albumImageUrl: null,
    songUrl: "https://open.spotify.com/track/0gZp88SA5OcujHLDGkxtI3?si=d73b9bebe1274d42",
    duration: 257000,
    progress: 150000,
  },
  {
    isPlaying: true,
    title: "Seven Years",
    artist: "Saosin",
    album: "Translating the Name",
    albumImageUrl: null,
    songUrl: "https://open.spotify.com/track/0C71NJD4BhvPopTwI7a8KV?si=b95d20a6115d4444",
    duration: 193000,
    progress: 90000,
  },
  {
    isPlaying: true,
    title: "MakeDamnSure",
    artist: "Taking Back Sunday",
    album: "Louder Now (Deluxe Edition)",
    albumImageUrl: null,
    songUrl: "https://open.spotify.com/track/6fTgbkBiMITtHUmik95ClX?si=8c33d93a771b4243",
    duration: 188000,
    progress: 100000,
  },
  {
    isPlaying: true,
    title: "Voices",
    artist: "Saosin",
    album: "Saosin",
    albumImageUrl: null,
    songUrl: "https://open.spotify.com/track/71U9X93wy4BQGyvmjFqApv?si=3700eaef106c4b4a",
    duration: 218000,
    progress: 130000,
  },
  {
    isPlaying: true,
    title: "Hands Down",
    artist: "Dashboard Confessional",
    album: "A Mark, A Mission, A Brand, A Scar",
    albumImageUrl: null,
    songUrl: "https://open.spotify.com/track/6yVSp9H2STyLeOs7pjy2w4?si=27b311aaebb14e56",
    duration: 207000,
    progress: 110000,
  },
  {
    isPlaying: true,
    title: "I Can Tell There Was an Accident Here Earlier",
    artist: "Saosin",
    album: "I Can Tell There Was an Accident Here Earlier",
    albumImageUrl: null,
    songUrl: "https://open.spotify.com/track/5llAcLZpMCl8KmrcVUrE8d?si=38023d81bf164e66",
    duration: 196000,
    progress: 95000,
  },
  {
    isPlaying: true,
    title: "Until the Day I Die",
    artist: "Story Of The Year",
    album: "Page Avenue",
    albumImageUrl: null,
    songUrl: "https://open.spotify.com/track/0DKNNR9iDjwfCEpMiFXMJq?si=ba05b99ead814fbd",
    duration: 215000,
    progress: 125000,
  },
  {
    isPlaying: true,
    title: "Sleepers",
    artist: "Saosin",
    album: "Saosin",
    albumImageUrl: null,
    songUrl: "https://open.spotify.com/track/6s3d8xe76eyHPgD2QYutJQ?si=9b170d0f1cb64826",
    duration: 202000,
    progress: 105000,
  },
  {
    isPlaying: true,
    title: "Baby, You Wouldn't Last A Minute On The Creek",
    artist: "Chiodos",
    album: "All's Well That Ends Well",
    albumImageUrl: null,
    songUrl: "https://open.spotify.com/track/6p4jnIWFWyLz0zUo2RD9iu?si=4e397fc74222441b",
    duration: 241000,
    progress: 140000,
  },
];

/**
 * Get random track from playlist
 */
export const getRandomTrack = (): SpotifyTrack => {
  const randomIndex = Math.floor(Math.random() * MOCK_SPOTIFY_PLAYLIST.length);
  return MOCK_SPOTIFY_PLAYLIST[randomIndex];
};

/**
 * Get track by index
 */
export const getTrackByIndex = (index: number): SpotifyTrack => {
  return MOCK_SPOTIFY_PLAYLIST[index % MOCK_SPOTIFY_PLAYLIST.length];
};
