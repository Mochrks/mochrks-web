import React from "react";
import { cn } from "@/lib/utils";
import ShineBorder from "@/components/magicui/shine-border";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardProject } from "@/components/demo/CardProject";
import { p1, p2, p3, p4, p5 } from "@/assets";
export function RecentProject() {
  const [color, setColor] = useState("#ffffff");
  const navigate = useNavigate();

  const handleProject = () => {
    navigate("/project");
  };

  return (
    <>
      <div className="relative flex w-full h-full flex-col items-center overflow-hidden justify-center gap-10 pt-20 ">
        <div className="container flex items-center justify-center ">
          <div className="max-w-full mx-auto px-8">
            <CardProject items={projects} />
          </div>

        </div>

        <div className="pt-10 text-center">
          <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
            See Other Project
          </h2>
        </div>
        <div>
          <ShimmerButton className="shadow-2xl" onClick={handleProject}>
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Load More
            </span>
          </ShimmerButton>
        </div>
      </div>
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



];

