import React, { useState } from "react";
import { video } from "@/assets/index";

const LazyVideo: React.FC = () => {
  const [isVideoReady, setIsVideoReady] = useState(false);

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      {/* Static Overlay - Always visible for text contrast */}
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

      <div
        className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
          isVideoReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={() => setIsVideoReady(true)}
          data-video-manager-ignore
          className="w-full h-full object-cover object-right [will-change:transform]"
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default LazyVideo;
