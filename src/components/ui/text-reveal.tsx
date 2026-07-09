import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
}

const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = "",
  as: Tag = "h2",
  delay = 0,
  staggerDelay = 0.05,
  duration = 0.9,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: "-80px",
  });

  const words = text.split(" ");

  // Container stagger variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  // Each word animates from below
  const wordVariants = {
    hidden: {
      y: "110%",
      opacity: 0,
      rotateX: 45,
    },
    visible: {
      y: "0%",
      opacity: 1,
      rotateX: 0,
      transition: {
        duration,
        ease: [0.215, 0.61, 0.355, 1], // easeOutCubic — very smooth deceleration
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ perspective: 400 }}
    >
      <Tag className={className}>
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden"
            style={{ marginRight: "0.3em", verticalAlign: "top" }}
          >
            <motion.span
              className="inline-block"
              variants={wordVariants}
              style={{ willChange: "transform, opacity", transformOrigin: "bottom" }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
};

export default TextReveal;
