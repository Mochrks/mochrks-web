import React from "react";
import { Vortex } from "../ui/vortex";
import { TypewriterEffect } from "../ui/typewriter-effect";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button";

import useBreakpoints from "../../hooks/useBreakpoints";

export function WDYWTDN() {
  const navigate = useNavigate();
  const { isMd } = useBreakpoints();

  const handleArticle = () => {
    navigate("/article");
  };

  const handleProject = () => {
    navigate("/project");
  };
  const handleDesign = () => {
    navigate("/design");
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
    <div className="w-full mx-auto rounded-md h-full overflow-hidden  ">
      {/* <Vortex
        backgroundColor="rgba(0, 0, 0, 0.5)"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      > */}
      <div className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full">
        <TypewriterEffect words={words} />

        <p className="text-white text-base md:text-xl max-w-xl mt-6 text-center">
          Discover a world of my portfolio, featuring articles, designs, and
          diverse projects.
        </p>
        {isMd && (<div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <ShimmerButton className="shadow-2xl" onClick={handleArticle}>
            <span className="whitespace-pre-wrap text-end text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Article
            </span>
          </ShimmerButton>
          <ShimmerButton className="shadow-2xl" onClick={handleDesign}>
            <span className="whitespace-pre-wrap text-end text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Design
            </span>
          </ShimmerButton>
          <ShimmerButton className="shadow-2xl" onClick={handleProject}>
            <span className="whitespace-pre-wrap text-end text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Project
            </span>
          </ShimmerButton>
        </div>)}

        {isMd ? null : (<div className="flex flex-col gap-4  mt-5 pt-5">
          <Card className="w-[350px] bg-black bg-black:hover hover:bg-zinc-950 cursor-pointer" onClick={handleArticle}>
            <CardHeader>
              <CardTitle>Article</CardTitle>
              <CardDescription>See more</CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-[350px]  bg-black bg-black:hover hover:bg-zinc-950 cursor-pointer" onClick={handleDesign}>
            <CardHeader>
              <CardTitle> Design</CardTitle>
              <CardDescription>Look more my design</CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-[350px]  bg-black bg-black:hover hover:bg-zinc-950 cursor-pointer" onClick={handleProject}>
            <CardHeader>
              <CardTitle>Project</CardTitle>
              <CardDescription>See all project</CardDescription>
            </CardHeader>
          </Card>
        </div>)}
      </div>
    </div>
  );
}
