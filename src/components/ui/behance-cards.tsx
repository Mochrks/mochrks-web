import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type CardType = {
  id: number;
  title: string;
  src: string;
  author: string;
  likes: number;
  views: number;
  category: string;
  description: string;
};

export function BehanceCards({ cards }: { cards: CardType[] }) {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [likedCards, setLikedCards] = useState<Set<number>>(new Set());
  const [cardLikes, setCardLikes] = useState<Map<number, number>>(new Map());
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    const initialLikes = new Map();
    cards.forEach((card) => {
      initialLikes.set(card.id, card.likes);
    });
    setCardLikes(initialLikes);
  }, [cards]);

  const handleLike = (cardId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newLikedCards = new Set(likedCards);
    const newCardLikes = new Map(cardLikes);
    const currentLikes = newCardLikes.get(cardId) || 0;

    if (likedCards.has(cardId)) {
      newLikedCards.delete(cardId);
      newCardLikes.set(cardId, currentLikes - 1);
    } else {
      newLikedCards.add(cardId);
      newCardLikes.set(cardId, currentLikes + 1);
    }

    setLikedCards(newLikedCards);
    setCardLikes(newCardLikes);
  };

  const categories = ["All", ...Array.from(new Set(cards.map((card) => card.category)))];
  const filteredCards =
    activeCategory === "All" ? cards : cards.filter((card) => card.category === activeCategory);

  return (
    <>
      <TabsMenu categories={categories} setActiveCategory={setActiveCategory} />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 w-full"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredCards.map((card) => (
            <BehanceCard
              key={card.id}
              card={card}
              onCardClick={() => setSelectedCard(card)}
              onLike={handleLike}
              isLiked={likedCards.has(card.id)}
              currentLikes={cardLikes.get(card.id) || card.likes}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedCard && (
          <BehanceModal
            card={selectedCard}
            onClose={() => setSelectedCard(null)}
            onLike={handleLike}
            isLiked={likedCards.has(selectedCard.id)}
            currentLikes={cardLikes.get(selectedCard.id) || selectedCard.likes}
          />
        )}
      </AnimatePresence>
    </>
  );
}

const TabsMenu = ({
  categories,
  setActiveCategory,
}: {
  categories: string[];
  setActiveCategory: (category: string) => void;
}) => {
  return (
    <div className="w-full h-full md:px-6 mb-20">
      <div className="mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Digital Experiences
        </h2>
        <p className="text-gray-400 text-lg max-w-3xl">
          Crafting intuitive and immersive user interfaces that blend aesthetics with functionality
          for web and mobile platforms.
        </p>
      </div>
      <SlideTabs categories={categories} setActiveCategory={setActiveCategory} />
    </div>
  );
};

const SlideTabs = ({
  categories,
  setActiveCategory,
}: {
  categories: string[];
  setActiveCategory: (category: string) => void;
}) => {
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
      className="relative mx-auto md:mx-0 flex w-fit rounded-full border-2 border-black bg-white p-1 justify-start"
    >
      {categories.map((category) => (
        <Tab
          key={category}
          setPosition={setPosition}
          setActiveCategory={setActiveCategory}
          category={category}
        >
          {category.toUpperCase()}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({
  children,
  setPosition,
  setActiveCategory,
  category,
}: {
  children: React.ReactNode;
  setPosition: any;
  setActiveCategory: (c: string) => void;
  category: string;
}) => {
  const ref = useRef<HTMLLIElement>(null);

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
      className="relative z-10 block cursor-pointer px-4 py-2 text-xs sm:text-base  uppercase text-white mix-blend-difference md:px-6 md:py-2"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }: { position: any }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-8 md:h-10 rounded-full bg-black"
    />
  );
};

interface BehanceCardProps {
  card: CardType;
  onCardClick: () => void;
  onLike: (cardId: number, e: React.MouseEvent) => void;
  isLiked: boolean;
  currentLikes: number;
}

function BehanceCard({ card, onCardClick, onLike, isLiked, currentLikes }: BehanceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative cursor-pointer group overflow-hidden rounded-lg bg-gray-100 aspect-[4/3]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onCardClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={card.src}
        alt={card.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <h3 className="text-white text-base md:text-lg font-bold mb-2 line-clamp-2">
            {card.title}
          </h3>
          <p className="text-white/80 text-sm font-medium">{card.author}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface BehanceModalProps {
  card: CardType;
  onClose: () => void;
  onLike: (cardId: number, e: React.MouseEvent) => void;
  isLiked: boolean;
  currentLikes: number;
}

function BehanceModal({ card, onClose, onLike, isLiked, currentLikes }: BehanceModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleBackdropClick = () => {
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
      />

      <motion.div
        className="relative bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col z-10"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white transition-colors backdrop-blur-sm shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-6 h-6" />
        </motion.button>

        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <div className="relative w-full bg-gray-900">
            <img
              src={card.src}
              alt={card.title}
              className="w-full h-auto max-h-[60vh] object-contain mx-auto"
            />
          </div>

          <div className="p-6 md:p-8 lg:p-10">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {card.title}
              </h2>
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src="https://mochrks.github.io/assets/img-photo/pf.jpg"
                    alt={card.author}
                  />
                  <AvatarFallback>MR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-gray-900 font-semibold text-lg">{card.author}</p>
                  <p className="text-gray-500 text-sm">Software Developer</p>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">About This Project</h3>
              <p className="text-gray-700 leading-relaxed text-lg">{card.description}</p>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-sm">
                  <div className="text-3xl font-bold text-gray-900">2024</div>
                  <div className="text-sm text-gray-600 mt-1 font-medium">Year</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-sm">
                  <div className="text-3xl font-bold text-gray-900">{card.category}</div>
                  <div className="text-sm text-gray-600 mt-1 font-medium">Platform</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-sm">
                  <div className="text-3xl font-bold text-gray-900">Design</div>
                  <div className="text-sm text-gray-600 mt-1 font-medium">Type</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
