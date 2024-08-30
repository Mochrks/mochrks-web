import React from "react";

const LazyVideo: React.FC = () => {
  return (
    <video autoPlay loop muted playsInline>
      <source src="/video/Videos.mp4" type="video/mp4" />
    </video>
  );
};

export default LazyVideo;
