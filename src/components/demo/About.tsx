import React from "react";
import { PiGlobeSimpleBold } from "react-icons/pi";
import { BackgroundGradient } from "../ui/background-gradient";
import { Rizki } from "@/assets";

export default function About() {
  return (
    <div className="container flex flex-col lg:flex-row px-5 lg:px-20 py-1 lg:py-20 gap-10 lg:gap-20 ">

      <div className="hidden lg:flex justify-center items-center">
        <BackgroundGradient className="rounded-full  bg-transparent">
          <div className="rounded-full overflow-hidden w-80 h-80">
            <img
              src={Rizki}
              alt="Moch. Rizki Kurniawan"
              className="object-cover w-full h-full"
            />
          </div>
        </BackgroundGradient>
      </div>

      <div className="flex lg:hidden justify-center items-center">
        <div className="rounded-full overflow-hidden w-48 h-48 border-4 border-cyan-500/30">
          <img
            src={Rizki}
            alt="Moch. Rizki Kurniawan"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="w-full ">
        <header className="flex items-center pt-5 lg:pt-10">
          <h1 className="flex-grow scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
            About me
          </h1>
          <PiGlobeSimpleBold className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem]" />
        </header>

        <article className="mt-10 lg:mt-20 pb-10 lg:pb-20">
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
  );
}