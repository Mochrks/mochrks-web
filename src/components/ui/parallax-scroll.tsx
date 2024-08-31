import React, { useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
// import Image from "next/image";
import { cn } from "@/lib/utils";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import Particles from "@/components/magicui/particles";

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
      <div className="relative  w-full">
        <BGContent />
      </div>
      <div className="relative w-full h-full overflow-hidden">
        <div className="container text-center mt-10"></div>
        <div
          className={cn("h-full items-start overflow-y-auto w-full ", className)}
          ref={gridRef}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start  max-w-7xl mx-auto gap-10 py-40 px-10 z-10"
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
      </div>
    </>
  );
};
const BGContent = () => {
  return (
    <div
      className="grid grid-cols-1 h-full w-full relative border rounded-md overflow-hidden"
      style={{
        backgroundImage: `url(https://mochrks.github.io/img/ig10.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Noise />
      <h1 className="text-white text-center text-6xl md:text-7xl lg:text-9xl mt-40 font-extrabold tracking-tight  pb-10 z-10">
        My Photography
      </h1>
      <div className="inset-0 absolute bg-grid-black/[0.1] dark:bg-grid-white/[0.1]" />
    </div>
  );
};

const Noise = () => {
  return (
    <div
      className="absolute inset-0 w-full h-[36rem] scale-[1.2] transform opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
      style={{
        backgroundImage: "url(/noise.webp)",
        backgroundSize: "40%",
      }}
    ></div>
  );
};
