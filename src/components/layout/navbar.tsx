import React, { useState, useEffect } from "react";
import "@/styles/Navbar.css";
import Menu from "@/components/layout/menu";
import { logo } from "@/assets/index";
import { MotionConfig, motion, AnimatePresence } from "framer-motion";
export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOrigin, setMenuOrigin] = useState({ x: window.innerWidth - 60, y: 40 });

  const handleMenuItemClick = () => {
    setIsActive(false);
  };

  const handleToggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setIsActive((pv) => !pv);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <nav className={`nav ${isScrolled ? "scrolled" : ""}`}>
        <header className="logo">
          <img
            className="font-acorn inline w-[3rem] h-[3rem] "
            src={logo}
            alt="Logo"
            width="48"
            height="48"
          />
          <h2 className="font-acorn text-white ml-2 my-auto text-md font-semibold tracking-tight first:mt-0">
            Hello
            <br />
            World.
          </h2>
        </header>

        <div className="z-50">
          <MotionConfig
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <motion.button
              initial={false}
              animate={isActive ? "open" : "closed"}
              onClick={handleToggleMenu}
              aria-label="Toggle navigation menu"
              title="Toggle Menu"
              className="relative h-[3rem] w-[3rem] lg:h-[4rem] lg:w-[4rem]  rounded-full bg-white/0 transition-colors hover:bg-white/20"
            >
              <motion.span
                variants={VARIANTS.top}
                className="absolute h-1 w-10 bg-white"
                style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
              />
              <motion.span
                variants={VARIANTS.middle}
                className="absolute h-1 w-10 bg-white"
                style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
              />
              <motion.span
                variants={VARIANTS.bottom}
                className="absolute h-1 w-5 bg-white"
                style={{
                  x: "-50%",
                  y: "50%",
                  bottom: "35%",
                  left: "calc(30% + 20px)",
                }}
              />
            </motion.button>
          </MotionConfig>
        </div>

        <AnimatePresence mode="wait">
          {isActive && <Menu onMenuItemClick={handleMenuItemClick} origin={menuOrigin} />}
        </AnimatePresence>
      </nav>
    </header>
  );
}

const VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: "calc(50% + 10px)",
    },
  },
};
