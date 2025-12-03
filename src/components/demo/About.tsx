import React from "react";
import { PiGlobeSimpleBold } from "react-icons/pi";
import { Rizki } from "@/assets";
import { Icon } from "../ui/evervault-card";

export default function About() {
  return (
    <React.Fragment>
      <div className="container sm:px-0 md:px-20">
        <header className="flex items-center pt-5 lg:pt-10">
          <h1 className="flex-grow scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
            About me
          </h1>
          <PiGlobeSimpleBold className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem]" />
        </header>
      </div>

      <div className="container flex flex-col lg:flex-row px-5 lg:px-20 py-10 lg:py-10 gap-10 lg:gap-20 ">
        <div className="flex justify-center items-center ">
          <div className="border border-white/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
            <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-white" />
            <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-white" />
            <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-white" />
            <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-white" />
            <div className="w-80 h-80 overflow-hidden ">
              <img src={Rizki} alt="Moch. Rizki Kurniawan" className="object-cover w-full h-full" />
            </div>

            <h2 className="dark:text-white text-white mt-4 text-sm font-light">
              "If the plan doesn't work, change the plan but never the goal"
            </h2>
            <p className="text-sm border font-light dark:border-white/[0.2] border-white/[0.2] rounded-full mt-4 text-white dark:text-white px-2 py-0.5">
              @mochrks
            </p>
          </div>
        </div>
        <div className="w-full ">
          <article className="mt-2 lg:mt-10 pb-10 lg:pb-20">
            <p className="max-w-full antialiased text-base leading-loose text-white md:text-lg lg:text-xl">
              I'm Moch. Rizki Kurniawan - a Software Developer passionate about full-stack web
              development and UI/UX design. I specialize in building modern web applications using
              React, Vue.js, and Next.js, creating both powerful functionality and engaging user
              experiences. My background in UI/UX design ensures I craft interfaces that are not
              just technically sound but also intuitive and visually appealing. Beyond coding, my
              skills in photography, video production, and graphic design bring an extra creative
              dimension to every project. I'm ready to deliver innovative solutions for robust web
              applications, intuitive interfaces, and enhanced user experiences. Let's connect and
              create something amazing together!
            </p>
          </article>
        </div>
      </div>
    </React.Fragment>
  );
}
