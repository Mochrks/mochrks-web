import React from "react";
import "@/styles/Menu.css";
import { MenuFeatures } from "./MenuFeatures";
import { useNavigate } from "react-router-dom";
import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { about, project, photo, uiux, article, contact, design } from "@/assets";
import { LinkProps } from "@/types/link";

const MENU_ITEMS = [
  {
    heading: "About",
    subheading: "Learn more about my personality",
    imgSrc: about,
    href: "#about",
    handler: (onClick) => onClick,
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
    handler: (onClick) => onClick,
  },
];

export default function Menu({ onMenuItemClick }) {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.href) {
      onMenuItemClick();
    } else {
      item.handler(onMenuItemClick, navigate);
    }
  };

  return (
    <div className="menu">
      <ul className="list-none px-5 md:px-14 2xl:px-[100px] pt-[3rem] 4xl:pt-[15rem]">
        <li>
          <section className="w-full">
            <div className="mx-auto">
              {MENU_ITEMS.map((item, index) => (
                <Link
                  key={index}
                  heading={item.heading}
                  subheading={item.subheading}
                  imgSrc={item.imgSrc}
                  href={item.href}
                  onClick={() => handleClick(item)}
                />
              ))}
            </div>
          </section>
        </li>
        <li>
          <MenuFeatures />
        </li>
      </ul>
    </div>
  );
}

const Link: React.FC<LinkProps> = ({ heading, imgSrc, subheading, href, onClick }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e) => {
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
