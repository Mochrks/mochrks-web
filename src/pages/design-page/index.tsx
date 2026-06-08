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
import SEO from "@/components/demo/SEO";

const TabsMenu = ({ setActiveCategory }) => {
  return (
    <div className="w-full h-full px-4 py-8 md:px-6 md:py-12 lg:px-20 lg:py-16 ">
      <div className="mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Visual Artistry
        </h2>
        <p className="text-gray-400 text-lg max-w-3xl">
          A curated gallery of illustrations, apparel designs, and creative artwork crafted with
          passion and detail.
        </p>
      </div>
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
      className="relative mx-auto md:mx-0 flex w-fit rounded-full border-2 border-black bg-white p-1 justify-start"
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
      <SEO
        title="Moch. Rizki Kurniawan | Graphic Design & Artwork Portfolio"
        description="View the professional apparel designs, illustrations, brand assets, and creative vector artworks designed by Moch. Rizki Kurniawan (@mochrks)."
        keywords="Moch. Rizki Kurniawan, graphic design portfolio, vector artwork, apparel design, illustration portfolio, t-shirt design, mochrks"
        path="/design-artwork"
      />
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
          <div className="fixed inset-0 z-[100] isolate">
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArtwork(null)}
            />
            <div
              className="fixed inset-0 z-[101] overflow-y-auto overflow-x-hidden"
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedArtwork(null);
              }}
            >
              <div className="flex min-h-full justify-center p-4 text-center sm:p-6">
                <motion.div
                  className="relative my-auto w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl will-change-transform flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ scale: 0.95, opacity: 0, y: 40 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 40 }}
                  transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 300,
                    mass: 0.8,
                  }}
                >
                  <motion.button
                    onClick={() => setSelectedArtwork(null)}
                    className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors backdrop-blur-md"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.button>

                  <div className="flex flex-col bg-white">
                    <div className="relative w-full bg-gray-900 border-b border-gray-100">
                      <img
                        src={selectedArtwork.imageUrl}
                        alt={selectedArtwork.title}
                        className="w-full h-auto object-contain max-h-[70vh] mx-auto"
                      />
                    </div>

                    <div className="p-6 md:p-8 lg:p-10">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8 border-b border-gray-100 pb-8">
                        <div className="space-y-4 max-w-2xl">
                          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                            {selectedArtwork.title}
                          </h2>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 md:w-12 md:h-12 border border-gray-200">
                              <AvatarImage
                                src="https://mochrks.github.io/assets/img-photo/pf.jpg"
                                alt={selectedArtwork.artist}
                              />
                              <AvatarFallback>MR</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-gray-900 font-semibold text-base">
                                {selectedArtwork.artist}
                              </p>
                              <p className="text-gray-500 text-xs md:text-sm">Artwork Designer</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}
        <ScrollToTopButton />
        {/* 
        <div className="flex justify-center mt-20 mb-20">
          <InteractiveHoverButton onClick={() => navigate("/")} className="text-lg font-medium">
            Back to Previous Page
          </InteractiveHoverButton>
        </div> */}
      </div>
    </>
  );
}
