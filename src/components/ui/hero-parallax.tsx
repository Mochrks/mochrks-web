import React, { useRef, useMemo, memo, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import LazyImage from "@/components/demo/LazyImage";

interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

interface ProductCardProps {
  product: Product;
  translate: any;
}

const ProductCard = memo(({ product, translate }: ProductCardProps) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20, transition: { duration: 0.2, ease: "easeOut" } }}
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
    </motion.div>
  );
});

ProductCard.displayName = "ProductCard";

interface HeroParallaxProps {
  products: Product[];
}

export const HeroParallax = memo(({ products }: HeroParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = {
    stiffness: 80,
    damping: 25,
    mass: 0.2,
    restDelta: 0.001,
  };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 300]), springConfig);

  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -300]),
    springConfig
  );

  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.3], [0.5, 1]), springConfig);

  const [firstRow, secondRow, thirdRow] = useMemo(() => {
    const isMobile = window.innerWidth < 768;
    const itemsPerRow = isMobile ? 3 : 4;

    const first = products.slice(0, itemsPerRow);
    const second = products.slice(itemsPerRow, itemsPerRow * 2);
    const third = products.slice(itemsPerRow * 2, itemsPerRow * 3);
    return [first, second, third];
  }, [products]);

  useEffect(() => {
    let animationFrameId: number;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (Math.abs(window.scrollY - lastScrollY) > 5) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }

        animationFrameId = requestAnimationFrame(() => {
          lastScrollY = window.scrollY;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      window.dispatchEvent(new Event("resize"));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={ref}
      className="h-full py-10  overflow-hidden antialiased relative flex flex-col"
      style={{
        transformStyle: "preserve-3d",
        perspective: window.innerWidth < 768 ? "500px" : "1000px",
        willChange: "transform",
      }}
    >
      <Header />

      <motion.div
        style={{ opacity }}
        className="mask-gradient [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
      >
        <motion.div
          className="flex flex-row-reverse space-x-reverse space-x-4 md:space-x-8 lg:space-x-12 mb-6 md:mb-8 lg:mb-12"
          style={{ x: translateX }}
        >
          {firstRow.map((product) => (
            <ProductCard
              key={`${product.title}-first-${product.link}`}
              product={product}
              translate={translateX}
            />
          ))}
        </motion.div>

        <motion.div
          className="flex flex-row space-x-4 md:space-x-8 lg:space-x-12 mb-6 md:mb-8 lg:mb-12"
          style={{ x: translateXReverse }}
        >
          {secondRow.map((product) => (
            <ProductCard
              key={`${product.title}-second-${product.link}`}
              product={product}
              translate={translateXReverse}
            />
          ))}
        </motion.div>

        <motion.div
          className="flex flex-row-reverse space-x-reverse space-x-4 md:space-x-8 lg:space-x-12"
          style={{ x: translateX }}
        >
          {thirdRow.map((product) => (
            <ProductCard
              key={`${product.title}-third-${product.link}`}
              product={product}
              translate={translateX}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
});

HeroParallax.displayName = "HeroParallax";

const Header = memo(() => {
  return (
    <div className="max-w-7xl text-white relative mx-auto py-8 md:py-9 lg:py-32 px-4 w-full">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold text-center md:text-left"
      >
        My Project <br /> UI /UX Designer
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="max-w-2xl text-sm md:text-base lg:text-lg mt-4 md:mt-6 text-neutral-300 text-center md:text-left mx-auto md:mx-0"
      >
        I create stunning products using the latest technologies and frameworks.
      </motion.p>
    </div>
  );
});

Header.displayName = "Header";
