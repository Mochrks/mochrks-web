import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { X } from 'lucide-react'
import ScrollToTopButton from "@/components/demo/ScrollToTopButton";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export const Title = () => {
  return (
    <section className=" place-content-center gap-2 bg-white px-8 py-14 lg:py-24 text-black">
      <FlipLink>MY </FlipLink>
      <FlipLink>DESIGN.</FlipLink>
      <FlipLink>ARTWORK</FlipLink>
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

export const TabsMenu = () => {
  return (
    <div className=" py-10">
      <SlideTabs />
    </div>
  );
};

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto  md:ml-7 flex w-fit rounded-full border-2 border-black bg-white p-1"
    >
      <Tab setPosition={setPosition}>Artwork Design</Tab>
      <Tab setPosition={setPosition}>Ilustration</Tab>
      <Tab setPosition={setPosition}>Manipulation</Tab>
      <Tab setPosition={setPosition}>Potrait</Tab>
      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
  );
};


interface Artwork {
  id: number
  title: string
  imageUrl: string
  artist: string
  description: string
  category: string
}

const artworks: Artwork[] = [
  {
    id: 1,
    title: "Neon Dreams",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    artist: "@mochrks",
    description: "A vibrant cityscape painted with neon colors, capturing the essence of urban nightlife.",
    category: "artwork"
  },
  {
    id: 2,
    title: "Serene Nature",
    imageUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "artwork"
  },

]

export default function index() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  return (
    <>

      <div className="w-full h-full">
        <Title />
        <TabsMenu />
        <section id="photos" className="mx-auto px-10 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-6">
            {artworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedArtwork(artwork)}
              >
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <h3 className="text-white text-xl font-semibold">{artwork.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {selectedArtwork && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed  inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 "
              onClick={() => setSelectedArtwork(null)}
            >
              <Button
                className="absolute top-4 right-3 rounded-full bg-transparent hover:bg-black/30  text-white hover:text-gray-200 transition-colors"
                onClick={() => setSelectedArtwork(null)}
              >
                <X size={20} />
              </Button>
              <motion.div
                className="flex flex-col justify-between bg-white rounded-lg h-5/6 max-w-3xl w-full lg:max-w-full lg:w-[90rem] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >

                <div className="">
                  <img
                    src={selectedArtwork.imageUrl}
                    alt={selectedArtwork.title}
                    className="w-full h-[25rem] lg:h-[28rem] 2xl:h-[50rem] object-cover"
                  />
                  <div className="flex p-5">
                    <div className="flex p-2 ">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>MR</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-col px-2 ">
                      <h2 className="text-2xl font-bold text-black ">{selectedArtwork.title}</h2>
                      <p className="text-gray-600 ">by {selectedArtwork.artist}</p>
                    </div>
                  </div>
                  <p className="text-gray-800 px-7">{selectedArtwork.description}</p>
                </div>

                <div className="p-5">

                </div>

              </motion.div>
            </motion.div>
          </>
        )}
        <ScrollToTopButton />
      </div >
    </>
  );
}



