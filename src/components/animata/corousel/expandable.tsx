import React from "react";
import { useEffect, useState } from "react";
import WaveReveal from "@/components/animata/text/wave-reveal";
import { cn } from "@/lib/utils";
import { ExpandableProps, ImageProps } from "@/types/expandable";
const List = ({ item, className, index, activeItem, ...props }: ImageProps) => {
  return (
    <div
      className={cn(
        "relative flex h-full w-20 min-w-10 cursor-pointer overflow-hidden rounded-md transition-all delay-0 duration-300 ease-in-out",
        {
          "flex-grow": index === activeItem,
        },
        className
      )}
      {...props}
    >
      <img
        src={item.image}
        alt={item.title}
        className={cn("h-full w-full object-cover", {
          "blur-[2px]": index !== activeItem,
        })}
      />
      {index === activeItem && (
        <div className="absolute bottom-4 left-4 min-w-fit text-white md:bottom-8 md:left-8">
          <WaveReveal
            duration="1000ms"
            className="items-start justify-start text-xl sm:text-2xl md:text-6xl"
            text={item.title}
            direction="up"
          />
        </div>
      )}
    </div>
  );
};

const items = [
  {
    image: "https://mochrks.github.io/assets/img-photo/ig5.jpg",
    title: "Beach Bliss",
  },
  {
    image: "https://mochrks.github.io/assets/img-photo/ig24.jpg",
    title: "Forest Charm",
  },
  {
    image: "https://mochrks.github.io/assets/img-photo/11.png",
    title: "Horse & Landscape",
  },
  {
    image: "https://mochrks.github.io/assets/img-instagram/mochrks/mochrks-44.jpg",
    title: "Deer Sweetness",
  },
];

export default function Expandable({ list = items, autoPlay = true, className }: ExpandableProps) {
  const [activeItem, setActiveItem] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [visibleCount, setVisibleCount] = useState(list.length);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(Math.min(4, list.length)); // Desktop: 4
      } else if (window.innerWidth >= 768) {
        setVisibleCount(Math.min(3, list.length)); // Tablet: 3
      } else {
        setVisibleCount(Math.min(2, list.length)); // Mobile: 2
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [list.length]);

  const visibleList = list.slice(0, visibleCount);

  useEffect(() => {
    if (activeItem >= visibleCount) {
      setActiveItem(0);
    }
  }, [visibleCount, activeItem]);

  useEffect(() => {
    if (!autoPlay) {
      return;
    }

    const interval = setInterval(() => {
      if (!isHovering) {
        setActiveItem((prev) => (prev + 1) % visibleCount);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, visibleCount, isHovering]);

  return (
    <div className={cn("flex h-96 w-full gap-2 pt-10 ", className)}>
      {visibleList.map((item, index) => (
        <List
          key={item.title}
          item={item}
          index={index}
          activeItem={activeItem}
          onMouseEnter={() => {
            setActiveItem(index);
            setIsHovering(true);
          }}
          onMouseLeave={() => {
            setIsHovering(false);
          }}
        />
      ))}
    </div>
  );
}
