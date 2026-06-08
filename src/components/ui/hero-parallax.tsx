import React, { useRef, useMemo, memo, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import LazyImage from "@/components/demo/LazyImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

interface ProductCardProps {
  product: Product;
  rowPosition?: "top" | "middle" | "bottom";
}

const ProductCard = memo(({ product, rowPosition = "middle" }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(false);
  };

  return (
    <div
      key={product.title}
      className={cn(
        "group/product h-48 md:h-64 lg:h-80 w-[18rem] md:w-[25rem] lg:w-[35rem] relative flex-shrink-0 cursor-pointer",
        isHovered ? "z-[999]" : "z-10"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block group-hover/product:shadow-2xl w-full h-full relative rounded-xl overflow-hidden shadow-lg"
      >
        <div className="relative w-full h-full bg-black">
          <LazyImage
            src={product.thumbnail}
            alt={product.title}
            className={cn(
              "object-cover object-left-top absolute h-full w-full inset-0 transition-all duration-300",
              isHovered ? "opacity-30 blur-[2px] scale-105" : "opacity-100"
            )}
            loading="lazy"
          />
          {/* Button overlay on the card */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300",
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
          >
            <span className="px-6 py-3 bg-blue-600/80 backdrop-blur-md text-white font-semibold rounded-full flex items-center gap-2 shadow-xl border border-white/10">
              Open in Behance
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </span>
          </div>
        </div>
      </Link>

      <div
        className={cn(
          "absolute bottom-2 left-2 md:bottom-4 md:left-4 pointer-events-none bg-gray-900/70 backdrop-blur-md px-2 py-1 md:px-3 md:py-2 rounded-lg w-[calc(100%-1rem)] md:w-max z-20 transition-opacity duration-300",
          isHovered ? "opacity-0" : "opacity-100"
        )}
      >
        <h2 className="text-white text-xs md:text-sm lg:text-lg font-bold line-clamp-1 md:line-clamp-2">
          {product.title}
        </h2>
        <div className="flex items-center mt-0.5 md:mt-1">
          <span className="text-[10px] md:text-xs text-gray-300 font-medium mr-1">
            View Project
          </span>
          <svg
            className="w-2 h-2 md:w-3 md:h-3 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: rowPosition === "top" ? -20 : 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: rowPosition === "top" ? -20 : 20, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute left-1/2 -translate-x-1/2 w-[280px] h-[220px] md:w-[400px] md:h-[300px] bg-white dark:bg-gray-900 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] z-[999] overflow-visible border border-gray-200 dark:border-gray-800 pointer-events-auto flex flex-col",
              rowPosition === "top" ? "top-full mt-4" : "bottom-full mb-4"
            )}
          >
            {/* Chat bubble tail */}
            {rowPosition === "top" ? (
              // Tail pointing UP (Modal is below card)
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[14px] border-l-transparent border-r-transparent border-b-gray-200 dark:border-b-gray-800 drop-shadow-sm">
                <div className="absolute -bottom-[15px] -left-[10px] w-0 h-0 border-l-[10px] border-r-[10px] border-b-[12px] border-l-transparent border-r-transparent border-b-white dark:border-b-gray-900" />
              </div>
            ) : (
              // Tail pointing DOWN (Modal is above card)
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[14px] border-l-transparent border-r-transparent border-t-gray-200 dark:border-t-gray-800 drop-shadow-sm">
                <div className="absolute -top-[15px] -left-[10px] w-0 h-0 border-l-[10px] border-r-[10px] border-t-[12px] border-l-transparent border-r-transparent border-t-white dark:border-t-gray-900" />
              </div>
            )}

            <div className="flex flex-col w-full h-full overflow-hidden rounded-2xl relative">
              {/* Mac OS style header */}
              <div className="bg-gray-100 dark:bg-gray-800 p-2 md:p-3 flex items-center border-b border-gray-200 dark:border-gray-700 shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-3 md:ml-4 text-[10px] md:text-xs text-gray-500 font-medium truncate flex-1 pr-4">
                  {product.link.replace(/^https?:\/\//, "")}
                </div>
              </div>
              {/* Web Preview using Official Behance Embed */}
              <div className="relative flex-1 bg-gray-50 dark:bg-black w-full overflow-hidden group/preview">
                {/* Invisible overlay to capture mouse events but block iframe scroll/click */}
                <div className="absolute inset-0 z-10" />
                {product.link.includes("behance.net/gallery/") ? (
                  <iframe
                    src={`https://www.behance.net/embed/project/${product.link.split("behance.net/gallery/")[1].split("/")[0]}?color=0057ff&color_bg=ffffff&auto_preview=true`}
                    title="preview"
                    className="w-full h-full border-0 pointer-events-none"
                    allow="autoplay; clipboard-write"
                    loading="lazy"
                  />
                ) : (
                  <img
                    src={product.thumbnail}
                    alt="preview"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

interface HeroParallaxProps {
  products: Product[];
}

export const HeroParallax = memo(({ products }: HeroParallaxProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [firstRow, secondRow, thirdRow] = useMemo(() => {
    const isMobile = window.innerWidth < 768;
    const itemsPerRow = isMobile ? 3 : 4;

    const first = products.slice(0, itemsPerRow);
    const second = products.slice(itemsPerRow, itemsPerRow * 2);
    const third = products.slice(itemsPerRow * 2, itemsPerRow * 3);
    return [first, second, third];
  }, [products]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        }
      );

      // Scroll Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1, // Smooth scrubbing
        },
      });

      tl.to(row1Ref.current, { x: 150, ease: "none" }, 0)
        .to(row2Ref.current, { x: -150, ease: "none" }, 0)
        .to(row3Ref.current, { x: 150, ease: "none" }, 0)
        .fromTo(containerRef.current, { opacity: 0.5 }, { opacity: 1, ease: "none" }, 0);

      // Mobile check for simpler animation if needed, but GSAP handles it well usually
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full py-10 overflow-hidden antialiased relative flex flex-col"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <div ref={headerRef} className="opacity-0">
        <Header />
      </div>

      <div className="mask-gradient [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        {/* Left Gradient Overlay */}
        <div className="absolute top-0 left-0 h-full w-24 md:w-32 lg:w-48 bg-gradient-to-r from-black dark:from-black to-transparent z-20 pointer-events-none" />
        {/* Right Gradient Overlay */}
        <div className="absolute top-0 right-0 h-full w-24 md:w-32 lg:w-48 bg-gradient-to-l from-black dark:from-black to-transparent z-20 pointer-events-none" />

        <div
          ref={row1Ref}
          className="relative hover:z-50 flex flex-row-reverse space-x-reverse space-x-4 md:space-x-8 lg:space-x-12 mb-6 md:mb-8 lg:mb-12 [will-change:transform] [backface-visibility:hidden]"
        >
          {firstRow.map((product) => (
            <ProductCard
              key={`${product.title}-first-${product.link}`}
              product={product}
              rowPosition="top"
            />
          ))}
        </div>

        <div
          ref={row2Ref}
          className="relative hover:z-50 flex flex-row space-x-4 md:space-x-8 lg:space-x-12 mb-6 md:mb-8 lg:mb-12 [will-change:transform] [backface-visibility:hidden]"
        >
          {secondRow.map((product) => (
            <ProductCard
              key={`${product.title}-second-${product.link}`}
              product={product}
              rowPosition="middle"
            />
          ))}
        </div>

        <div
          ref={row3Ref}
          className="relative hover:z-50 flex flex-row-reverse space-x-reverse space-x-4 md:space-x-8 lg:space-x-12 [will-change:transform] [backface-visibility:hidden]"
        >
          {thirdRow.map((product) => (
            <ProductCard
              key={`${product.title}-third-${product.link}`}
              product={product}
              rowPosition="bottom"
            />
          ))}
        </div>
      </div>
    </div>
  );
});

HeroParallax.displayName = "HeroParallax";

const Header = memo(() => {
  return (
    <div className="max-w-7xl text-white relative mx-auto py-8 md:py-9 lg:py-32 px-4 w-full">
      <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold text-center md:text-left z-99 text-white">
        My Project <br /> UI /UX Designer
      </h1>
      <p className="max-w-2xl text-sm md:text-base lg:text-lg mt-4 md:mt-6 text-neutral-300 text-center md:text-left mx-auto md:mx-0">
        I create stunning products using the latest technologies and frameworks.
      </p>
    </div>
  );
});

Header.displayName = "Header";
