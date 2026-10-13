import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ScrollToTopButton from "@/components/layout/scroll-to-top-button";
import { FlipLinkTitle } from "@/components/ui/title";
import { LoadingContent } from "@/components/layout/loading-content";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { useNavigate } from "react-router-dom";
import LazyImage from "@/components/ui/lazy-image";

export const ParallaxScroll = ({ images, className }: { images: string[]; className?: string }) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Distribusi merata ke 3 kolom (round-robin agar jumlah setiap kolom selisih max 1)
  const firstPart: string[] = [];
  const secondPart: string[] = [];
  const thirdPart: string[] = [];

  images.forEach((img, idx) => {
    if (idx % 3 === 0) firstPart.push(img);
    else if (idx % 3 === 1) secondPart.push(img);
    else thirdPart.push(img);
  });

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
        <div className="flex flex-col place-content-center gap-2 bg-white px-8 py-14 lg:py-24 ">
          <div className="text-black">
            <FlipLinkTitle>MY</FlipLinkTitle>
            <FlipLinkTitle>PHOTO-</FlipLinkTitle>
            <FlipLinkTitle>GRAPHY.</FlipLinkTitle>
          </div>
          <div>
            <InteractiveHoverButton
              onClick={() => navigate("/")}
              className="text-sm md:text-lg xs font-medium mt:2"
            >
              Back
            </InteractiveHoverButton>
          </div>
        </div>
      </div>
      <div className="w-full h-full px-4 py-8 md:px-6 md:py-12 lg:px-20 lg:py-16 ">
        <div className="mb-8 md:mb-12 text-left px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Captured Moments
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl">
            A visual journey through my lens, capturing life's beautiful moments and perspectives.
          </p>
        </div>
      </div>
      <div className="relative w-full h-full overflow-hidden">
        <div className={cn("h-full items-start overflow-y-auto w-full ", className)} ref={gridRef}>
          {loading ? (
            <LoadingContent />
          ) : (
            <>
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-5 text-center px-12 "
                ref={gridRef}
              >
                <div className="grid gap-10">
                  {firstPart.map((el, idx) => (
                    <motion.div style={{ y: translateFirst }} key={"grid-1" + idx}>
                      <LazyImage
                        src={el}
                        alt={`photography-1-${idx}`}
                        className="h-190 w-full rounded-lg"
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="grid gap-10">
                  {secondPart.map((el, idx) => (
                    <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
                      <LazyImage
                        src={el}
                        alt={`photography-2-${idx}`}
                        className="h-190 w-full rounded-lg"
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="grid gap-10">
                  {thirdPart.map((el, idx) => (
                    <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
                      <LazyImage
                        src={el}
                        alt={`photography-3-${idx}`}
                        className="h-190 w-full rounded-lg"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
              {/* <div className="flex justify-center mb-20 mt-10">
                <InteractiveHoverButton
                  onClick={() => navigate("/")}
                  className="text-lg font-medium"
                >
                  Back to Previous Page
                </InteractiveHoverButton>
              </div> */}
            </>
          )}
        </div>
        <ScrollToTopButton />
      </div>
    </>
  );
};
