import React from "react";
import "@/styles/Menu.css";
import { MenuFeatures } from "./MenuFeatures";
import { useNavigate } from "react-router-dom";
import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { about, project, photo, uiux, article, contact, design } from "@/assets";
import { LinkProps } from "@/types/link";


export default function Menu({ onMenuItemClick }) {
  const navigate = useNavigate();
  const handleArticle = () => {
    navigate("/article");
  };
  const handlePhotography = () => {
    navigate("/photography");
  };

  const handleProject = () => {
    navigate("/project");
  };
  const handleDesign = () => {
    navigate("/design-artwork");
  };
  const handleUIUX = () => {
    navigate("/ui-ux-design");
  };
  return (
    <React.Fragment>
      <div className="menu">
        <ul className="list-none  px-5 md:px-14 2xl:px-[100px] pt-[3rem] 4xl:pt-[15rem] ">

          <li>
            <section className="w-full">
              <div className="mx-auto ">
                <Link
                  heading="About"
                  subheading="Learn more about my personality"
                  imgSrc={about}
                  href="#about"
                  onClick={onMenuItemClick}
                />
                <Link
                  heading="Project"
                  subheading="Showcasing my latest work"
                  imgSrc={project}
                  onClick={handleProject}
                />
                <Link
                  heading="Design Artwork"
                  subheading="Creative designs that tell a story"
                  imgSrc={design}
                  onClick={handleDesign}
                />
                <Link
                  heading="UI/UX"
                  subheading="Designing intuitive user experiences"
                  imgSrc={uiux}
                  onClick={handleUIUX}
                />
                <Link
                  heading="Photography"
                  subheading="Visual storytelling through my lens"
                  imgSrc={photo}
                  onClick={handlePhotography}
                />
                <Link
                  heading="Article"
                  subheading="Read my thoughts on design and development"
                  imgSrc={article}
                  onClick={handleArticle}
                />
                <Link
                  heading="Contact"
                  subheading="Let’s connect and collaborate"
                  imgSrc={contact}
                  href="#contact"
                  onClick={onMenuItemClick}
                />
              </div>
            </section>
          </li>
          <li>
            <MenuFeatures />
          </li>
        </ul>
      </div>
    </React.Fragment>
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