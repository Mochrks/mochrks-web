import React from "react";
import { motion } from "framer-motion";

interface EqualizerProps {
  isPlaying?: boolean;
  barCount?: number;
  className?: string;
}

export const Equalizer: React.FC<EqualizerProps> = ({
  isPlaying = true,
  barCount = 4,
  className = "",
}) => {
  const bars = Array.from({ length: barCount }, (_, i) => i);

  return (
    <div className={`flex items-center justify-center gap-0.5 h-4 ${className}`}>
      {bars.map((bar) => (
        <motion.div
          key={bar}
          className="w-0.5 bg-green-500 dark:bg-green-400 rounded-full"
          animate={
            isPlaying
              ? {
                  height: ["40%", "100%", "60%", "80%", "40%"],
                }
              : {
                  height: "40%",
                }
          }
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bar * 0.1,
          }}
        />
      ))}
    </div>
  );
};

export default Equalizer;
