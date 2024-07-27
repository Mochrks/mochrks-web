import ShineBorder from "@/components/magicui/shine-border";
import React from "react";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { useEffect, useState } from "react";
import Particles from "@/components/magicui/particles";
export function RecentProject() {
  const [color, setColor] = useState("#ffffff");
  return (
    <>
      <div className="relative flex w-full h-screen flex-col items-center overflow-hidden justify-center gap-10 pt-[100px]">
        <Particles
          className="absolute inset-0"
          quantity={400}
          ease={80}
          color={color}
          refresh
        />
        <ShineBorder
          className="relative flex min-h-[500px] min-w-[800px] flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
          <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            Shine Border
          </span>
        </ShineBorder>

        <div className="pt-10 text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            See Other Project
          </h1>
        </div>
        <div>
          <ShimmerButton className="shadow-2xl">
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Load More
            </span>
          </ShimmerButton>
        </div>
      </div>
    </>
  );
}
