import React from "react";
import "@/styles/Menu.css";
import { MenuFeatures } from "@/components/layout/menu-features";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { about, project, photo, uiux, article, contact, design } from "@/assets";
import { LinkProps } from "@/types/link";

interface MenuItem {
  heading: string;
  subheading: string;
  imgSrc: string;
  href?: string;
  handler?: (onClick: () => void, navigate: NavigateFunction) => void;
}

const MENU_ITEMS: MenuItem[] = [
  {
    heading: "About",
    subheading: "Learn more about my personality",
    imgSrc: about,
    href: "#about",
  },
  {
    heading: "Project",
    subheading: "Showcasing my latest project",
    imgSrc: project,
    handler: (_, navigate) => navigate("/project"),
  },
  {
    heading: "Design Artwork",
    subheading: "Creative designs that tell a story",
    imgSrc: design,
    handler: (_, navigate) => navigate("/design-artwork"),
  },
  {
    heading: "UI/UX",
    subheading: "Designing intuitive user experiences",
    imgSrc: uiux,
    handler: (_, navigate) => navigate("/ui-ux-design"),
  },
  {
    heading: "Photography",
    subheading: "Visual storytelling through my lens",
    imgSrc: photo,
    handler: (_, navigate) => navigate("/photography"),
  },
  {
    heading: "Article",
    subheading: "Read my thoughts on article",
    imgSrc: article,
    handler: (_, navigate) => navigate("/article"),
  },
  {
    heading: "Contact",
    subheading: "Let's connect and collaborate",
    imgSrc: contact,
    href: "#contact",
  },
];

interface MenuProps {
  onMenuItemClick: () => void;
  origin?: { x: number; y: number };
}

// Staggered container variants — orchestrates children fade-in
const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.35, // wait for clip-path to partially reveal
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

// Individual menu item entrance animation
const menuItemVariants = {
  initial: {
    opacity: 0,
    y: 60,
    rotate: 3,
    filter: "blur(6px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    rotate: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    filter: "blur(4px)",
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

// Dock / features fade-in (appears last)
const dockVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.92,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.35 + MENU_ITEMS.length * 0.08 + 0.1, // after all items
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

export default function Menu({ onMenuItemClick, origin }: MenuProps) {
  const navigate = useNavigate();

  const handleClick = (item: MenuItem) => {
    if (item.href) {
      onMenuItemClick();
    } else if (item.handler) {
      item.handler(onMenuItemClick, navigate);
    }
  };

  const cx = origin?.x || window.innerWidth - 60;
  const cy = origin?.y || 40;

  // Light Gray layer expands first
  const lightGrayVariants = {
    initial: { clipPath: `circle(0px at ${cx}px ${cy}px)` },
    animate: {
      clipPath: `circle(150% at ${cx}px ${cy}px)`,
      transition: { type: "tween", duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0 },
    },
    exit: {
      clipPath: `circle(0px at ${cx}px ${cy}px)`,
      transition: { type: "tween", duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
    },
  };

  // Dark Gray layer expands second
  const darkGrayVariants = {
    initial: { clipPath: `circle(0px at ${cx}px ${cy}px)` },
    animate: {
      clipPath: `circle(150% at ${cx}px ${cy}px)`,
      transition: { type: "tween", duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 },
    },
    exit: {
      clipPath: `circle(0px at ${cx}px ${cy}px)`,
      transition: { type: "tween", duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.05 },
    },
  };

  // Main menu (Hitam) expands third
  const menuVariants = {
    initial: { clipPath: `circle(0px at ${cx}px ${cy}px)` },
    animate: {
      clipPath: `circle(150% at ${cx}px ${cy}px)`,
      transition: { type: "tween", duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
    },
    exit: {
      clipPath: `circle(0px at ${cx}px ${cy}px)`,
      transition: { type: "tween", duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0 },
    },
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1040,
        pointerEvents: "none",
      }}
    >
      {/* ===== Motion graphic pre-layers (OUTSIDE clip-path) ===== */}

      {/* Light Gray panel */}
      <motion.div
        variants={lightGrayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          position: "absolute",
          inset: 0,
          background: "#a1a1aa", // zinc-400 (Abu Muda)
          zIndex: 1,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* Dark Gray panel */}
      <motion.div
        variants={darkGrayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          position: "absolute",
          inset: 0,
          background: "#3f3f46", // zinc-700 (Abu Tua)
          zIndex: 2,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* ===== Main menu with clip-path reveal ===== */}
      <motion.div
        className="menu"
        variants={menuVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ zIndex: 4, pointerEvents: "auto" }}
      >
        <motion.ul
          className="list-none px-5 md:px-14 2xl:px-[100px] pt-[3rem] 4xl:pt-[15rem]"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ position: "relative", zIndex: 2 }}
        >
          <li>
            <section className="w-full">
              <div className="mx-auto">
                {MENU_ITEMS.map((item, index) => (
                  <motion.div key={index} variants={menuItemVariants}>
                    <Link
                      heading={item.heading}
                      subheading={item.subheading}
                      imgSrc={item.imgSrc}
                      href={item.href}
                      onClick={() => handleClick(item)}
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          </li>
          <motion.li variants={dockVariants} className="hidden md:block">
            <MenuFeatures />
          </motion.li>
        </motion.ul>
      </motion.div>
    </div>
  );
}

const Link: React.FC<LinkProps> = ({ heading, imgSrc, subheading, href, onClick }) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.a
      {...(href ? { href } : {})}
      ref={ref}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b-2 border-neutral-700  transition-colors duration-500 hover:border-neutral-50 py-1 md:py-3 2xl:py-[0.85rem]  cursor-pointer"
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="relative z-10 block  font-bold text-neutral-300 transition-colors duration-500 group-hover:text-neutral-50 text-4xl md:text-4xl lg:text-5xl 2xl:text-6xl"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-2 block text-base text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50">
          {subheading}
        </span>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={imgSrc}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64"
        alt={`Image representing a link for ${heading}`}
      />

      <motion.div
        variants={{
          initial: {
            x: "25%",
            opacity: 0,
          },
          whileHover: {
            x: "0%",
            opacity: 1,
          },
        }}
        transition={{ type: "spring" }}
        className="relative z-10 p-4"
      >
        <FiArrowRight className="text-5xl text-neutral-50" />
      </motion.div>
    </motion.a>
  );
};
