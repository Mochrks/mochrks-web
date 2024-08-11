import ShineBorder from "@/components/magicui/shine-border";
import React from "react";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { useEffect, useState } from "react";
import Particles from "@/components/magicui/particles";
import { WobbleCard } from "@/components/ui/wobble-card";
import { FaGithub, FaMedium } from "react-icons/fa";

export function RecentProject() {
  const [color, setColor] = useState("#ffffff");
  return (
    <>
      <div className="relative flex w-full h-full flex-col items-center overflow-hidden justify-center gap-10 pt-20 pb-20 ">
        <Particles
          className="absolute inset-0"
          quantity={400}
          ease={80}
          color={color}
          refresh
        />
        <div className="container flex items-center justify-center ">
          <ShineBorder
            className="relative flex flex-col items-center justify-center h-[300px] lg:h-[400px] xl:h-[400px] min-w-[300px] md:min-w-[800px] lg:min-w-[800px] xl:min-w-[800px] overflow-hidden rounded-lg border bg-background md:shadow-xl "
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          >
            <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-full lg:min-h-full xl:min-h-full">
              <div className="max-w-sm">
                <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                  Web Robotics Ai Project
                </h2>
                <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                  in this project, I build a website about innovative,
                  challenging, advanced, technology, artificial intelligence,
                  robotics, and attractive design.
                </p>

                <ul className="flex flex-wrap mt-2 gap-2 ">
                  <li>
                    <a
                      href="https://medium.com/@mochrks"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                    >
                      <FaMedium className="w-8 h-8 dark:text-neutral-200 text-slate-100" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/Mochrks"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="w-8 h-8 dark:text-neutral-200 text-slate-100" />
                    </a>
                  </li>
                </ul>
              </div>
              <img
                src="/img/web2.jpg"
                width={500}
                height={400}
                alt="linear demo image"
                className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl -z-10"
              />
            </WobbleCard>
          </ShineBorder>
        </div>
        <div className="container flex items-center justify-center ">
          <ShineBorder
            className="relative flex flex-col items-center justify-center h-[300px] lg:h-[400px] xl:h-[400px] min-w-[300px] md:min-w-[800px] lg:min-w-[800px] xl:min-w-[800px] overflow-hidden rounded-lg border bg-background md:shadow-xl"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          >
            <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-full lg:min-h-full xl:min-h-full">
              <div className="max-w-sm">
                <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                  Web Drone Project
                </h2>
                <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                  About The web drone website project using React and the
                  Tailwind Framework is a website creation project designed to
                  promote drone products. This website was created using React
                  technology to build a dynamic and responsive user interface,
                </p>

                <ul className="flex flex-wrap mt-2 gap-2 ">
                  <li>
                    <a
                      href="https://medium.com/@mochrks"
                      target="_blank"
                      className="cursor-pointer"
                    >
                      <FaMedium className="w-8 h-8 dark:text-neutral-200 text-slate-100" />
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/Mochrks" target="_blank">
                      <FaGithub className="w-8 h-8 dark:text-neutral-200 text-slate-100" />
                    </a>
                  </li>
                </ul>
              </div>
              <img
                src="/img/web3.jpg"
                width={500}
                height={400}
                alt="linear demo image"
                className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl -z-10"
              />
            </WobbleCard>
          </ShineBorder>
        </div>

        <div className="pt-10 text-center">
          <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
            See Other Project
          </h2>
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
