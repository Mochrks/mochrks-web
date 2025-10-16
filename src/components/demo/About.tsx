import React from "react";
import { PiGlobeSimpleBold } from "react-icons/pi";
import { Rizki } from "@/assets";
import { Icon } from "../ui/evervault-card";

export default function About() {
  return (
    <>
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
              <img
                src={Rizki}
                alt="Moch. Rizki Kurniawan"
                className="object-cover w-full h-full"
              />
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
              I'm Moch. Rizki Kurniawan as a software developer with a special
              interest in full-stack development and UI/UX design. I blend
              creativity with technical skills in all my projects. With a strong
              background in UI/UX design and full-stack development, I can create
              engaging user experiences while building powerful and functional
              applications. My broad experience in software development and
              interface design enables me to tackle various challenges
              confidently. I focus not only on the technical aspects of software
              development but also on creating beautiful and user-friendly
              interfaces. Additionally, I have skills in photography, video
              production, and graphic design, which add extra creativity to my
              work. I can produce visually appealing content that not only meets
              functional needs but also captivates users. Therefore, I'm ready to
              provide innovative and impactful solutions for my clients, whether
              it's developing robust web applications, designing intuitive user
              interfaces, or enhancing existing user experiences. If you're
              looking for a creative partner who can integrate technical skills
              with design sensitivity and has expertise in photography, video
              production, and graphic design, let's connect and explore the
              possibilities!
            </p>
          </article>
        </div>
      </div>
    </>
  );
}