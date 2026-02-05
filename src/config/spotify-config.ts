export const SPOTIFY_CONFIG = {
  USE_MOCK_DATA: true,

  AUTO_SHOW: {
    enabled: true,
    maxShowsPerDay: 10,
    minIntervalMinutes: 10,
    maxIntervalMinutes: 120,
    autoHideAfterSeconds: 30,
  },

  ROTATION: {
    enabled: true,
    intervalSeconds: 15,
    randomSong: true,
  },

  UI: {
    position: "bottom-right",
    showEqualizer: true,
    showProgressBar: true,
  },
};

export const getRandomShowInterval = (): number => {
  const { minIntervalMinutes, maxIntervalMinutes } = SPOTIFY_CONFIG.AUTO_SHOW;
  const min = minIntervalMinutes * 60 * 1000;
  const max = maxIntervalMinutes * 60 * 1000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const canShowToday = (): boolean => {
  const today = new Date().toDateString();
  const stored = localStorage.getItem("spotify_widget_shows");

  if (!stored) return true;

  try {
    const data = JSON.parse(stored);
    if (data.date !== today) {
      // New day, reset counter
      localStorage.setItem("spotify_widget_shows", JSON.stringify({ date: today, count: 0 }));
      return true;
    }
    return data.count < SPOTIFY_CONFIG.AUTO_SHOW.maxShowsPerDay;
  } catch {
    return true;
  }
};

export const incrementShowCount = (): void => {
  const today = new Date().toDateString();
  const stored = localStorage.getItem("spotify_widget_shows");

  if (!stored) {
    localStorage.setItem("spotify_widget_shows", JSON.stringify({ date: today, count: 1 }));
    return;
  }

  try {
    const data = JSON.parse(stored);
    if (data.date === today) {
      data.count += 1;
      localStorage.setItem("spotify_widget_shows", JSON.stringify(data));
    }
  } catch {
    localStorage.setItem("spotify_widget_shows", JSON.stringify({ date: today, count: 1 }));
  }
};
