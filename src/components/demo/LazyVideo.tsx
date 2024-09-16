import React, { useState, useEffect } from "react";
import Meteors from "@/components/magicui/meteors";
import { motion } from "framer-motion";
import { video } from "@/assets/index";

const LazyVideo: React.FC = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);


  const startFadeOutHero = () => {
    setTimeout(() => {
      setIsHeroVisible(false);
    }, 2000);
  };

  useEffect(() => {
    startFadeOutHero();
  }, []);

  const fadeInOutHero = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
    fadeOut: { opacity: 0, transition: { duration: 1 } },
  };

  return (
    <div className="relative">

      {isHeroVisible && (
        <motion.div
          initial="hidden"
          animate={isHeroVisible ? "visible" : "fadeOut"}
          variants={fadeInOutHero}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Meteors number={5} />
        </motion.div>
      )}

      {!isHeroVisible && (
        <video
          autoPlay
          preload="none"
          loop
          muted
          playsInline
          onCanPlay={() => setIsVideoReady(true)}
          data-video-manager-ignore
          className="w-full h-full"
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default LazyVideo;
