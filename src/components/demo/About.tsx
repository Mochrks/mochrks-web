import React from "react";
import { PiGlobeSimpleBold } from "react-icons/pi";
import { Rizki } from "@/assets";
import { Icon } from "../ui/evervault-card";
import cvFile from "@/assets/docs/CV_NEW_ATS_MOCH. RIZKI KURNIAWAN.pdf";

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
              <img
                src={Rizki}
                alt="Moch. Rizki Kurniawan"
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>

            <h2 className="dark:text-white text-white text-2xl font-medium mt-4">
              Fullstack Developer
            </h2>

            <div className="flex items-center space-x-2 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <h2 className="dark:text-white text-white text-sm font-light">
                Available for new projects
              </h2>
            </div>

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

            <div className="mt-10 flex justify-center lg:justify-start">
              <a
                href={cvFile}
                download="CV_MOCH_RIZKI_KURNIAWAN.pdf"
                className="relative inline-flex h-12 rounded-full p-[1px] border border-white/[0.2] dark:border-white/[0.2] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 group hover:opacity-90 transition-opacity"
              >
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-cyan-400"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download My CV
                </span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </React.Fragment>
  );
}
