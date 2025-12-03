import React from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

import { Link } from "react-router-dom";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = {
    stiffness: 150,
    damping: 25,
    mass: 0.5,
    restDelta: 0.001,
  };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), springConfig);
  return (
    <div
      ref={ref}
      className="h-full py-[100px] overflow-hidden  antialiased relative flex flex-col self-auto [perspective:600px] [transform-style:preserve-3d]  "
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="[mask-image:linear-gradient(to_right,transparent,white_15%,white_90%,transparent)] "
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl text-white relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl md:text-7xl font-bold dark:text-white"
      >
        My Project <br /> UI /UX Designer
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200"
      >
        I create stunning products using the latest technologies and frameworks. As a passionate
        developer and designer, I love crafting amazing and innovative solutions.
      </motion.p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -30,
      }}
      key={product.title}
      className="group/product h-96 w-[40rem] relative flex-shrink-0 rounded-xl overflow-hidden cursor-pointer shadow-lg transition-shadow"
    >
      <Link to={product.link} className="block group-hover/product:shadow-2xl ">
        <img
          src={product.thumbnail}
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute bottom-6 left-6 pointer-events-none bg-gray-900/30 backdrop-blur-sm px-4 py-3 rounded-xl w-max flex flex-col group-hover/product:backdrop-blur-md transition">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-2xl font-bold tracking-tight drop-shadow-lg"
        >
          {product.title}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
          className="flex items-center mt-2 bg-black backdrop-blur-sm px-3 py-1 rounded-full w-max group-hover/product:bg-black transition"
        >
          <span className="text-sm text-gray-300 font-medium mr-2 ">View Project</span>
          <svg
            className="w-4 h-4 text-blue-400"
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
        </motion.div>
      </div>

      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover/product:opacity-100 blur-lg transition-all duration-500 -z-10" />
    </motion.div>
  );
};
