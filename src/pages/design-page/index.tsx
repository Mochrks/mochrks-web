import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from 'lucide-react'
import ScrollToTopButton from "@/components/demo/ScrollToTopButton";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FlipLinkTitle } from "@/components/demo/Title";
import { LoadingContent } from "@/components/demo/LoadingContent";
import { artworks } from "@/apis/design-artwork";

interface Artwork {
  id: number
  title: string
  imageUrl: string
  artist: string
  description: string
  category: string
}

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
        {/* title */}
        <section className=" place-content-center gap-2 bg-white px-8 py-14 lg:py-24 text-black">
          <FlipLinkTitle>MY DESIGN</FlipLinkTitle>
          <FlipLinkTitle>ARTWORK.</FlipLinkTitle>
        </section>
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
            <LoadingContent />
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
                      <AvatarImage src="https://mochrks.github.io/assets/img-photo/pf.jpg" alt="@mochrks" />
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





