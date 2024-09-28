import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from 'lucide-react'
import ScrollToTopButton from "@/components/demo/ScrollToTopButton";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export const Title = () => {
  return (
    <section className="place-content-center gap-2 bg-white px-8 py-14 lg:py-24 text-black">
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
            key={i}
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};

const ITEMS_PER_PAGE = 13;

export const TabsMenu = ({ setActiveCategory }) => {
  return (
    <div className="py-10">
      <SlideTabs setActiveCategory={setActiveCategory} />
    </div>
  );
};

const SlideTabs = ({ setActiveCategory }) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const categories = ["design t-shirt", "illustration", "artwork", "portrait"];

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto md:ml-7 flex w-fit rounded-full border-2 border-black bg-white p-1"
    >
      {categories.map((category) => (
        <Tab key={category} setPosition={setPosition} setActiveCategory={setActiveCategory} category={category}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition, setActiveCategory, category }) => {
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
      onClick={() => setActiveCategory(category)}
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


export default function Index() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [activeCategory, setActiveCategory] = useState("illustration");
  const [displayedArtworks, setDisplayedArtworks] = useState<Artwork[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreArtworks = async (nextPage: number, reset: boolean = false) => {
    setIsLoading(true);

    // Simulate API call with a 2-second delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const filteredArtworks = artworks.filter(
      (artwork) => artwork.category.toLowerCase() === activeCategory.toLowerCase()
    );
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newArtworks = filteredArtworks.slice(startIndex, endIndex);

    if (reset) {
      setDisplayedArtworks(newArtworks);
    } else {
      setDisplayedArtworks((prev) => [...prev, ...newArtworks]);
    }
    setPage(nextPage);
    setIsLoading(false);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setPage(1);
    setDisplayedArtworks([]);
    loadMoreArtworks(1, true);
  };

  useEffect(() => {
    loadMoreArtworks(1, true);
  }, [activeCategory]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        !isLoading &&
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreArtworks(page + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, activeCategory, isLoading]);

  const range = (n: number) => Array.from(Array(n).keys())

  return (
    <>
      <div className="w-full h-full">
        <Title />
        <TabsMenu setActiveCategory={handleCategoryChange} />
        <section id="photos" className="mx-auto px-10 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-7">

            {displayedArtworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedArtwork(artwork)}
              >
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="h-96 w-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <h3 className="text-white text-xl font-semibold">{artwork.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>


          {isLoading && (
            <div className="flex justify-center items-center my-8 space-x-1">
              {range(3).map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-gray-500 rounded-full "
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </div>
          )}
        </section>

        {selectedArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedArtwork(null)}
          >
            <Button
              className="absolute top-4 right-3 rounded-full bg-transparent hover:bg-black/30 text-white hover:text-gray-200 transition-colors"
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
              <div className="p-5"></div>
            </motion.div>
          </motion.div>
        )}
        <ScrollToTopButton />
      </div>
    </>
  );
}



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
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork//D-1.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },

  {
    id: 2,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-01.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },

  {
    id: 3,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-02.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 4,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-03.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 5,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-04.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 6,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-05.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 7,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-06.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 8,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-07.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 9,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-08.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 10,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-09.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 11,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-10.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 12,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-11.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 13,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-12.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 14,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-13.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 15,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-14.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 16,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-15.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 17,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-16.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 18,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-17.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 19,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-18.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 20,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-19.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 21,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-20.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 22,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-21.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 23,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-22.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 24,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-23.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 25,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-24.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 26,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-25.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 27,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-26.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 28,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-27.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 29,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-28.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 30,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-29.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 31,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-30.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 32,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-31.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 33,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-32.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 34,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-33.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 35,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/D-34.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 36,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork1.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 37,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork2.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 38,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork3.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 39,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork4.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 40,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork5.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 41,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork6.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 42,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork7.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 43,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork8.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 44,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork9.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 45,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork10.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 46,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork11.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 47,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork12.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 48,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork13.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 49,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork14.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 50,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork15.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 51,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork16.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 52,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork17.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 53,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork18.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 54,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork19.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 55,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork20.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 56,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork21.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 57,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork22.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 58,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork23.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 59,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork24.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 60,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork25.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 61,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork26.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 62,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork27.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 63,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork28.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 64,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork29.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 65,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork30.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 66,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork31.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 67,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork32.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 68,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork33.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 69,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork34.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 70,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork35.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 71,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork36.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 72,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork37.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 73,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork38.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 74,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork39.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 75,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork40.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 76,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork41.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  {
    id: 77,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork42.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "design t-shirt"
  },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork43.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork44.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork45.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork46.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork47.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork48.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork49.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork50.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork51.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork52.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork53.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork54.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork55.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork56.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork57.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork58.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork59.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork60.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork61.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork62.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork63.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork64.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork65.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork66.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork67.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork68.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork69.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork70.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork71.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork72.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork73.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork74.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork75.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },
  // {
  //   id: 3,
  //   title: "Artwork",
  //   imageUrl: "https://mochrks.github.io/assets/img-artwork/Desain_Artwork76.webp",
  //   artist: "@mochrks",
  //   description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
  //   category: "design t-shirt"
  // },


  // portrait
  {
    id: 201,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/1.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 202,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/2.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 203,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/3.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 204,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/4.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 205,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/5.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 206,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/6.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 207,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/7.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 208,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/8.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 209,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/9.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 210,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/10.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 211,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/11.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 212,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/12.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 213,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/13.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 300,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/20.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 301,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/21.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 302,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/22.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 304,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/24.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 305,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/25.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 306,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/26.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 307,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/27.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 308,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/28.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 309,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/29.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 311,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/31.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 312,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/32.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },
  {
    id: 313,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-artwork-potrait/33.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "portrait"
  },

  // illustration

  {
    id: 501,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-ilustration/artwork 1.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "illustration"
  },
  {
    id: 502,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-ilustration/artwork 2.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "illustration"
  },
  {
    id: 503,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-ilustration/artwork 3.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "illustration"
  },
  {
    id: 504,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-ilustration/artwork 4.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "illustration"
  },
  {
    id: 505,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-ilustration/artwork 5.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "illustration"
  },


  // artwork
  {
    id: 506,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-ilustration/artwork 6.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "illustration"
  },

  // artwork
  {
    id: 601,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-manipulation/m-6.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "artwork"
  },
  {
    id: 602,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-manipulation/m-7.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "artwork"
  },
  {
    id: 603,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-manipulation/m-8.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "artwork"
  },
  {
    id: 604,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-manipulation/m-9.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "artwork"
  },
  {
    id: 605,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-manipulation/m-10.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "artwork"
  },
  {
    id: 606,
    title: "Artwork",
    imageUrl: "https://mochrks.github.io/assets/img-manipulation/m-11.webp",
    artist: "@mochrks",
    description: "A tranquil landscape featuring a misty forest and a calm lake, evoking a sense of peace and harmony.",
    category: "artwork"
  },



]




