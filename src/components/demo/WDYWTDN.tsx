import React from "react";
import { Vortex } from "../ui/vortex";
import { TypewriterEffect } from "../ui/typewriter-effect";
export function WDYWTDN() {
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
      <Vortex
        backgroundColor="rgba(0, 0, 0, 0.5)"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <TypewriterEffect words={words} />

        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          Discover a world of my portfolio, featuring articles, designs, and
          diverse projects.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            Article
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            Design
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            Project
          </button>
        </div>
      </Vortex>
    </div>
  );
}
