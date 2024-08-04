import React from "react";
import { Vortex } from "../ui/vortex";
import { TypewriterEffect } from "../ui/typewriter-effect";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { useNavigate } from "react-router-dom";
export function WDYWTDN() {
  const navigate = useNavigate();

  const handleArticle = () => {
    navigate("/article");
  };

  const words = [
    {
      text: "What ",
    },
    {
      text: "do",
    },
    {
      text: "you",
    },
    {
      text: "want ",
    },
    {
      text: " to",
    },
    {
      text: "do",
    },
    {
      text: "Now ?",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="w-full mx-auto rounded-md  h-[30rem] overflow-hidden  ">
      {/* <Vortex
        backgroundColor="rgba(0, 0, 0, 0.5)"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      > */}
      <div className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full">
        <TypewriterEffect words={words} />

        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          Discover a world of my portfolio, featuring articles, designs, and
          diverse projects.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <ShimmerButton className="shadow-2xl" onClick={handleArticle}>
            <span className="whitespace-pre-wrap text-end text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Article
            </span>
          </ShimmerButton>
          <ShimmerButton className="shadow-2xl">
            <span className="whitespace-pre-wrap text-end text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Design
            </span>
          </ShimmerButton>
          <ShimmerButton className="shadow-2xl">
            <span className="whitespace-pre-wrap text-end text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Project
            </span>
          </ShimmerButton>
        </div>
      </div>
    </div>
  );
}
