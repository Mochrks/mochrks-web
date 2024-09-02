import React from "react";
import { video } from "@/assets/index";
const LazyVideo: React.FC = () => {
  return (
    <video autoPlay loop muted playsInline>
      <source src={video} type="video/mp4" />
    </video>
  );
};

export default LazyVideo;
