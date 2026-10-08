import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, ExternalLink, User, X } from "lucide-react";
import { Equalizer } from "@/components/ui/equalizer";
import { MOCK_SPOTIFY_PLAYLIST } from "@/apis/spotify";
import { getNowPlaying, getSpotifyProfileUrl } from "@/services/spotify-service";
import {
  SPOTIFY_CONFIG,
  canShowToday,
  incrementShowCount,
  getRandomShowInterval,
} from "@/config/spotify-config";

export const SpotifyNowPlaying = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [nowPlaying, setNowPlaying] = useState(MOCK_SPOTIFY_PLAYLIST[0]);
  const [currentProgress, setCurrentProgress] = useState(MOCK_SPOTIFY_PLAYLIST[0].progress);
  const [profileUrl, setProfileUrl] = useState("https://open.spotify.com/user/mochrks");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = await getSpotifyProfileUrl();
        setProfileUrl(url);
        const data = await getNowPlaying();
        if (data) {
          setNowPlaying(data);
          setCurrentProgress(data.progress);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch Spotify data", error);
      }
    };

    fetchData();

    if (SPOTIFY_CONFIG.AUTO_SHOW.enabled && canShowToday()) {
      const delay = getRandomShowInterval();
      const showTimer = setTimeout(() => {
        setIsVisible(true);
        incrementShowCount();
        const hideTimer = setTimeout(() => {
          setIsVisible(false);
        }, SPOTIFY_CONFIG.AUTO_SHOW.autoHideAfterSeconds * 1000);
        return () => clearTimeout(hideTimer);
      }, delay);
      return () => clearTimeout(showTimer);
    }

    const interval = setInterval(async () => {
      const data = await getNowPlaying();
      if (data) {
        setNowPlaying((prev) => {
          if (prev.title !== data.title || Math.abs(prev.progress - data.progress) > 2000) {
            return data;
          }
          return prev;
        });
        if (Math.abs(currentProgress - data.progress) > 2000) {
          setCurrentProgress(data.progress);
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!nowPlaying.isPlaying) return;
    const progressInterval = setInterval(() => {
      setCurrentProgress((prev) => {
        if (prev >= nowPlaying.duration) return prev;
        return prev + 1000;
      });
    }, 1000);
    return () => clearInterval(progressInterval);
  }, [nowPlaying]);

  const handleClose = () => setIsVisible(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);
  const progress = Math.min((currentProgress / nowPlaying.duration) * 100, 100);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* ── MOBILE: compact pill, centered ── */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="fixed bottom-5 inset-x-0 flex justify-center px-6 z-50 md:hidden"
          >
            <div className="relative overflow-hidden rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 w-full max-w-xs">
              {/* Progress bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10">
                <motion.div
                  className="h-full bg-green-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="flex items-center gap-3 px-3 py-2.5">
                {/* Album Art */}
                <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-green-900/40 flex items-center justify-center">
                  {nowPlaying.albumImageUrl ? (
                    <img
                      src={nowPlaying.albumImageUrl}
                      alt={nowPlaying.album}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Music2 className="w-5 h-5 text-green-400" />
                  )}
                </div>

                {/* Title + Artist */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate leading-tight">
                    {nowPlaying.title}
                  </p>
                  <p className="text-[11px] text-white/50 truncate leading-tight mt-0.5">
                    {nowPlaying.artist}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Equalizer isPlaying={nowPlaying.isPlaying} barCount={3} />
                  <motion.a
                    href={nowPlaying.songUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-400 transition-colors"
                    whileTap={{ scale: 0.9 }}
                    title="Open in Spotify"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </motion.a>
                  <button
                    onClick={handleClose}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    title="Close"
                  >
                    <X className="w-3.5 h-3.5 text-white/70" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── DESKTOP: full widget, bottom-left ── */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="fixed bottom-6 left-6 z-50 hidden md:block"
          >
            <motion.div
              layout
              className={`
                relative overflow-hidden rounded-2xl
                bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10
                dark:from-green-400/20 dark:via-emerald-400/20 dark:to-teal-400/20
                backdrop-blur-xl border border-green-500/20 dark:border-green-400/30
                shadow-sm transition-all duration-300
                ${isExpanded ? "w-80" : "w-72"}
              `}
            >
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-green-900/20 dark:bg-green-100/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="relative p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
                    Now Playing
                  </span>
                  <div className="flex items-center gap-2">
                    <Equalizer isPlaying={nowPlaying.isPlaying} barCount={3} />
                    <button
                      onClick={handleClose}
                      className="p-1 rounded-full bg-black/20 hover:bg-black/40 dark:bg-white/10 dark:hover:bg-white/20 transition-colors group"
                    >
                      <X className="w-3.5 h-3.5 text-white/70 group-hover:text-white transition-colors" />
                    </button>
                  </div>
                </div>

                {/* Album Art & Info */}
                <div className="flex gap-3 mb-3">
                  <motion.div
                    className="relative flex-shrink-0 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    onClick={toggleExpand}
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-green-500/20">
                      {nowPlaying.albumImageUrl ? (
                        <img
                          src={nowPlaying.albumImageUrl}
                          alt={nowPlaying.album}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="relative w-full h-full bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 flex items-center justify-center">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 opacity-50"
                            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Music2 className="w-8 h-8 text-white relative z-10" />
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <motion.h3
                      className="font-bold text-sm text-white truncate mb-1"
                      animate={{ opacity: [1, 0.7, 1] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                    >
                      {nowPlaying.title}
                    </motion.h3>
                    <p className="text-xs text-white/90 truncate mb-1">{nowPlaying.artist}</p>
                    {isExpanded && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-white/70 truncate"
                      >
                        {nowPlaying.album}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <motion.a
                    href={nowPlaying.songUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white text-xs font-semibold transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Song</span>
                  </motion.a>
                  <motion.a
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white text-xs font-semibold transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Profile</span>
                  </motion.a>
                </div>

                {/* Spotify Footer */}
                <div className="mt-3 pt-3 border-t border-green-500/20 dark:border-green-400/20">
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4 text-green-500 dark:text-green-400"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      Powered by Spotify
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SpotifyNowPlaying;
