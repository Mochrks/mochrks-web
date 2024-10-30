import React from "react";
import { CardProject } from "@/components/demo/CardProject";
import { p1, p2, p3, p4, p5 } from "@/assets";
import ScrollToTopButton from "@/components/demo/ScrollToTopButton";
import { motion } from "framer-motion";
export default function index() {
  return (
    <>
      <div className="w-full">
        <Title />
      </div>
      <div className="max-w-[90rem] 2xl:max-w-full mx-auto px-10 py-10 2xl:py-20">
        <CardProject items={projects} cols={3} />
      </div>
      <ScrollToTopButton />
    </>
  );
}

export const projects = [
  {
    title: "Web Drone Product",
    description:
      "The web drone website project using React and the Tailwind Framework is a website creation project designed to promote drone products",
    link: "https://github.com/Mochrks/web-drone-project",
    web: "https://web-drone-dji.vercel.app/",
    git: "https://github.com/Mochrks/web-drone-project",
    img: p1,

  },
  {
    title: "Web Robotics Ai Product",
    description:
      "in this project, I build a website about innovative, challenging, advanced, technology, artificial intelligence, robotics, interactive and attractive design order",
    link: "https://github.com/Mochrks/web-robotics-ai-project",
    web: "https://web-robotics-ai.vercel.app/",
    git: "https://github.com/Mochrks/web-robotics-ai-project",
    img: p2,

  },
  {
    title: "Web E-commerce Tshirt Product",
    description:
      "Web modern and attractive T-shirt e-commerce website with a superior user interface (UI) and user experience (UX). ",
    link: "https://github.com/Mochrks/web-e-commerce-tshirt-brand-project",
    web: "https://web-tshirt-brand.vercel.app/",
    git: "https://github.com/Mochrks/web-e-commerce-tshirt-brand-project",
    img: p3,

  },
  {
    title: "Web Blockchain Product",
    description:
      "My project is to create a modern website UI/UX for blockchain technology using React + Vite, Tailwind and Framer Motion technologies",
    link: "https://github.com/Mochrks/web-multichain-gen-z-project",
    web: "https://web-multichain.vercel.app/",
    git: "https://github.com/Mochrks/web-multichain-gen-z-project",
    img: p4,
  },
  {
    title: "Web Nfts Product",
    description:
      "Creating attractive and efficient modern NFTs can be achieved by using React as the main framework and combining it with Tailwind CSS and Vite as supporting tools.",
    link: "https://github.com/Mochrks/web-nfts-project",
    web: "https://web-nfts-three.vercel.app/",
    git: "https://github.com/Mochrks/web-nfts-project",
    img: p5,
  },


];


export const Title = () => {
  return (
    <section className=" place-content-center gap-2 bg-white px-8 py-14 lg:py-24 text-black">
      <FlipLink>ALL </FlipLink>
      <FlipLink>PROJECT.</FlipLink>
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
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};