import React, { useEffect, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
// import Image from "next/image";
import { cn } from "@/lib/utils";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import Particles from "@/components/magicui/particles";
import ScrollToTopButton from "../demo/ScrollToTopButton";
import { FlipLinkTitle } from "../demo/Title";
import { LoadingContent } from "../demo/LoadingContent";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { useNavigate } from "react-router-dom";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);
  const [color, setColor] = useState("#ffffff");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="relative w-full">
        <section className=" place-content-center gap-2 bg-white px-8 py-14 lg:py-24 text-black">
          <FlipLinkTitle>MY</FlipLinkTitle>
          <FlipLinkTitle>PHOTOGRAPHY.</FlipLinkTitle>
        </section>
      </div>
      <div className="relative w-full h-full overflow-hidden">
        <div className="container text-center mt-10"></div>
        <div
          className={cn("h-full items-start overflow-y-auto w-full ", className)}
          ref={gridRef}
        >
          {loading ? (<LoadingContent />) : (
            <>
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
              <div className="flex justify-center mb-20 mt-10">
                <InteractiveHoverButton
                  onClick={() => navigate(-1)}
                  className="text-lg font-medium"
                >
                  Back to Previous Page
                </InteractiveHoverButton>
              </div>
            </>
          )}
        </div>
        <ScrollToTopButton />
      </div>
    </>
  );
};