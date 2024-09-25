import React, { useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
// import Image from "next/image";
import { cn } from "@/lib/utils";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import Particles from "@/components/magicui/particles";
import ScrollToTopButton from "../demo/ScrollToTopButton";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef, // remove this if your container is not fixed height
    offset: ["start start", "end start"], // remove this if your container is not fixed height
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);
  const [color, setColor] = useState("#ffffff");

  return (
    <>
      <div className="relative w-full">
        <Title />
      </div>
      <div className="relative w-full h-full overflow-hidden">
        <div className="container text-center mt-10"></div>
        <div
          className={cn("h-full items-start overflow-y-auto w-full ", className)}
          ref={gridRef}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-5 text-center px-12 py-5"
            ref={gridRef}
          >
            <div className="grid gap-10">
              {firstPart.map((el, idx) => (
                <motion.div
                  style={{ y: translateFirst }} // Apply the translateY motion value here
                  key={"grid-1" + idx}
                >
                  <img
                    src={el}
                    className="h-190 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0 z-50"
                    height="400"
                    width="400"
                    alt="thumbnail"
                  />
                </motion.div>
              ))}
            </div>
            <div className="grid gap-10">
              {secondPart.map((el, idx) => (
                <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
                  <img
                    src={el}
                    className="h-190 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                    height="400"
                    width="400"
                    alt="thumbnail"
                  />
                </motion.div>
              ))}
            </div>
            <div className="grid gap-10">
              {thirdPart.map((el, idx) => (
                <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
                  <img
                    src={el}
                    className="h-190 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                    height="400"
                    width="400"
                    alt="thumbnail"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>{" "}
        <Particles
          className="absolute inset-0"
          quantity={200}
          ease={80}
          color={color}
          refresh
        />
        <ShootingStars />
        <ScrollToTopButton />
      </div>
    </>
  );
};


export const Title = () => {
  return (
    <section className=" place-content-center gap-2 bg-white px-8 py-14 lg:py-24 text-black">
      <FlipLink>MY </FlipLink>
      <FlipLink>Photography.</FlipLink>

    </section>
  );
};
const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"

      className="relative block overflow-hidden whitespace-nowrap text-5xl font-black uppercase sm:text-7xl md:text-7xl lg:text-8xl 2xl:text-9xl"
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};
