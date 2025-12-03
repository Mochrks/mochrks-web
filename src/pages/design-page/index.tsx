import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import ScrollToTopButton from "@/components/demo/ScrollToTopButton";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FlipLinkTitle } from "@/components/demo/Title";
import { LoadingContent } from "@/components/demo/LoadingContent";
import { artworks } from "@/apis/design-artwork";
import { Artwork } from "@/types/design-page";
import { ITEMS_PER_PAGE } from "@/constants/variable";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useNavigate } from "react-router-dom";

const TabsMenu = ({ setActiveCategory }) => {
  return (
    <div className="py-5 md:py-10 bg-gray-400 flex flex-col md:flex-row items-center justify-between gap-4 px-4">
      <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
        <SlideTabs setActiveCategory={setActiveCategory} />
      </div>
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
        <Tab
          key={category}
          setPosition={setPosition}
          setActiveCategory={setActiveCategory}
          category={category}
        >
          {category.split(" ")[0].charAt(0).toUpperCase() + category.split(" ")[0].slice(1)}
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
      className="relative z-10 block cursor-pointer px-2 py-1 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
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
      className="absolute z-0 h-6 rounded-full bg-black md:h-12"
    />
  );
};

export default function Index() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [activeCategory, setActiveCategory] = useState("illustration");
  const [displayedArtworks, setDisplayedArtworks] = useState<Artwork[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const loadMoreArtworks = async (nextPage: number, reset: boolean = false) => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, activeCategory, isLoading]);

  return (
    <>
      <div className="w-full h-full">
        <div className="flex flex-col place-content-center gap-2 bg-white px-8 py-14 lg:py-24 ">
          <div className="text-black">
            <FlipLinkTitle>MY DESIGN</FlipLinkTitle>
            <FlipLinkTitle>ARTWORK.</FlipLinkTitle>
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

          {isLoading && <LoadingContent />}
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
              className="flex flex-col bg-white rounded-lg max-h-[90vh] max-w-3xl w-full lg:max-w-full lg:w-[90rem] overflow-hidden shadow-xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="relative h-full min-h-[50vh]">
                <div className="absolute inset-0 blur-md scale-105 z-0 overflow-hidden">
                  <img
                    src={selectedArtwork.imageUrl}
                    alt={selectedArtwork.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative z-10 flex justify-center items-center h-full p-8">
                  <img
                    src={selectedArtwork.imageUrl}
                    alt={selectedArtwork.title}
                    className="max-h-[60vh] object-contain"
                  />
                </div>
              </div>
              <div className="bg-white w-full p-5 z-50">
                <div className="flex items-center">
                  <div className="flex p-2">
                    <Avatar>
                      <AvatarImage
                        src="https://mochrks.github.io/assets/img-photo/pf.jpg"
                        alt="@mochrks"
                      />
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-col px-2">
                    <h2 className="text-2xl font-bold text-black">{selectedArtwork.title}</h2>
                    <p className="text-gray-600">by {selectedArtwork.artist}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        <ScrollToTopButton />
      </div>
    </>
  );
}
