import React from "react";
import "../../styles/Home.css";
import Navbar from "@/components/demo/Navbar";
import { Experience } from "@/components/demo/Experience";
import Expandable from "@/components/animata/corousel/expandable";
import WordFadeIn from "@/components/magicui/word-fade-in";
import { UIUXParallax } from "@/components/demo/UIUXParallax";
import About from "@/components/demo/About";
import { Skill } from "@/components/demo/Skill";
import Footer from "@/components/demo/Footer";
import { WDYWTDN } from "@/components/demo/WDYWTDN";
import { RecentProject } from "@/components/demo/RecentProject";
import { Contact } from "@/components/demo/Contact";
import { SeeMyPhotography } from "@/components/demo/SeeMyPhotography";
import { FlipWords } from "@/components/ui/flip-words";

export default function index() {
  const words = [
    "Software Developer",
    "Graphic Designer",
    "UI/UX Designer",
    "Photographer",
  ];

  return (
    <>
      {/* hero */}
      <div className="hero">
        <Navbar />
        <video autoPlay loop muted playsInline>
          <source src="../../src/assets/video/Video.mp4" type="video/mp4" />
        </video>{" "}
        <div id="content">
          <div className="text-start text-2xl md:text-4xl lg:text-6xl  z-20 mx-auto text-cyan-200 dark:text-white-400 text-spaced">
            <br />I invite you to explore my site to be better, <br />
            I am a <FlipWords words={words} /> <br />
            Enjoy My Work
          </div>
        </div>
      </div>

      {/* main section */}
      <div className="MainContent">
        {/* section UI/UX and recent project */}
        <div className="w-full h-full uiux-section">
          <UIUXParallax />
        </div>

        {/*  section Skill */}
        <div className="w-full h-full">
          <Skill />
        </div>

        {/* section about and education */}
        <div className="w-full h-full p-10 about">
          <About />
        </div>

        {/* section experience */}
        <div className="w-full h-full pt-[200px]">
          <WordFadeIn words="Experience" />
          <Experience />
        </div>

        {/* section recent projects */}
        <div className="w-full h-full pt-[100px]">
          <WordFadeIn words="Recent Projects" />
          <RecentProject />
        </div>

        {/* section my photography  */}
        <div className="w-full h-full pt-10 mt-20 ">
          <WordFadeIn words="My Photography" />
          <div className="container pt-10 ">
            <Expandable className="w-full min-w-72 storybook-fix" />
            <SeeMyPhotography />
          </div>
        </div>

        {/* section What do you want to do now? */}
        {/* <div className="w-full h-full ">
        <WDYWTDN />
      </div> */}

        {/* section form contact */}
        <div className="w-full h-full pt-10  mb-10 pb-10">
          <Contact />
        </div>

        {/* section for connection and footer */}
        <div className="w-full h-full p-10 bg-slate-50">
          <Footer />
        </div>
      </div>
    </>
  );
}
