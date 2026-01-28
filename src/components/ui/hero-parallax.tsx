import React, { useRef, useMemo, memo, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import LazyImage from "@/components/demo/LazyImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = memo(({ product }: ProductCardProps) => {
  return (
    <div
      key={product.title}
      className="group/product h-48 md:h-64 lg:h-80 w-[18rem] md:w-[25rem] lg:w-[35rem] relative flex-shrink-0 rounded-xl overflow-hidden cursor-pointer shadow-lg"
    >
      <Link
        to={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block group-hover/product:shadow-xl w-full h-full"
      >
        <div className="relative w-full h-full">
          <LazyImage
            src={product.thumbnail}
            alt={product.title}
            className="object-cover object-left-top absolute h-full w-full inset-0"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 pointer-events-none bg-gray-900/70 backdrop-blur-md px-2 py-1 md:px-3 md:py-2 rounded-lg w-[calc(100%-1rem)] md:w-max">
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
          className="flex flex-row-reverse space-x-reverse space-x-4 md:space-x-8 lg:space-x-12 mb-6 md:mb-8 lg:mb-12 [will-change:transform] [backface-visibility:hidden]"
        >
          {firstRow.map((product) => (
            <ProductCard key={`${product.title}-first-${product.link}`} product={product} />
          ))}
        </div>

        <div
          ref={row2Ref}
          className="flex flex-row space-x-4 md:space-x-8 lg:space-x-12 mb-6 md:mb-8 lg:mb-12 [will-change:transform] [backface-visibility:hidden]"
        >
          {secondRow.map((product) => (
            <ProductCard key={`${product.title}-second-${product.link}`} product={product} />
          ))}
        </div>

        <div
          ref={row3Ref}
          className="flex flex-row-reverse space-x-reverse space-x-4 md:space-x-8 lg:space-x-12 [will-change:transform] [backface-visibility:hidden]"
        >
          {thirdRow.map((product) => (
            <ProductCard key={`${product.title}-third-${product.link}`} product={product} />
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
