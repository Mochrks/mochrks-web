import { useState, useRef, useEffect } from "react";
import { video } from "@/assets/index";

const LazyVideo: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleReady = () => {
      // Small delay to ensure the first frame is painted
      requestAnimationFrame(() => {
        setIsReady(true);
      });
    };

    // If video is already ready (cached)
    if (videoEl.readyState >= 3) {
      handleReady();
      return;
    }

    videoEl.addEventListener("canplaythrough", handleReady);
    videoEl.addEventListener("playing", handleReady);

    return () => {
      videoEl.removeEventListener("canplaythrough", handleReady);
      videoEl.removeEventListener("playing", handleReady);
    };
  }, []);

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      {/* Solid background to prevent any white flash */}
      <div className="absolute inset-0 bg-[#0F1215] z-0" />

      {/* Static Overlay - Always visible for text contrast */}
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

      <div
        className="absolute inset-0 h-full w-full z-[1]"
        style={{
          opacity: isReady ? 1 : 0,
          transition: "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-right [will-change:transform]"
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default LazyVideo;
