import React, { useState, useEffect, lazy, Suspense } from "react";
import "@/styles/Home.css";

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
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Loading from "@/components/demo/Loading";
import { motion } from "framer-motion";
import {
  textVariantFromButtom,
  fadeIn,
  fadeInOpacity,
  staggerContainer,
  textVariantFromTop,
  textVariantFromLeft,
} from "@/utils/motion.js";
import Aurora from "@/components/demo/Aurora";
import CircularText from "@/components/demo/CircularText";


const LazyVideo = lazy(() => import("@/components/demo/LazyVideo"));

export default function index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const words = [
    "Software Developer",
    "Graphic Designer",
    "UI/UX Designer",
    "Photographer",
  ];
  const mochrks = [
    {
      text: "Mochrks",
      className: "text-slate-100",
    },
  ];

  return (
    <React.Fragment>
      {/* navbar */}
      <Navbar />
      <main>
        {/* hero */}
        <motion.div
          variants={staggerContainer(0.3, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="hero"
        >

          <Suspense >
            <LazyVideo />
          </Suspense>
          <div id="content">
            <motion.div
              variants={textVariantFromButtom(0.9)}
              className="text-start text-3xl md:text-4xl lg:text-6xl z-20 mx-auto text-cyan-200 dark:text-white-400 text-spaced
          "
            >
              <br />I invite you to explore my site to be better, <br />
              I am a <FlipWords words={words} /> <br />
              Enjoy My Work
              <br />
              <div id="signature">
                <TypewriterEffectSmooth words={mochrks} />
              </div>
            </motion.div>
            <motion.div
              variants={textVariantFromButtom(0.9)}
              className="absolute buttom-10 xs:left-10 md:right-20 transform translate-x-0 translate-y-0">
              <CircularText
                text="MOCHRKS*HELLO*WORLD*"
                onHover="speedUp"
                spinDuration={20}
                className="custom-class"
              />
            </motion.div>

          </div>
        </motion.div>



        {/* main content */}
        < motion.div
          variants={staggerContainer(0.3, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }
          }
          className="MainContent"
        >
          {/* section UI/UX and recent project */}
          < motion.section
            id="uiux"
            variants={textVariantFromTop(1.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
          >
            <div className="w-full h-full ">
              <UIUXParallax />
            </div>
          </motion.section >

          {/*  section Skill */}
          < motion.section
            id="skill"
            variants={textVariantFromLeft(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.45 }}
          >
            <div className="w-full h-full ">
              <Skill />
            </div>
          </motion.section >

          {/* section about and education */}
          < motion.section
            id="about"
            variants={textVariantFromButtom(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
          >
            <div className="w-full h-full">
              <About />
            </div>
          </motion.section >

          {/* section experience */}
          < motion.section
            id="experience"
            variants={textVariantFromButtom(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
          >
            <div className="w-full h-full pt-20">
              <WordFadeIn words="Experience" />
              <Experience />
            </div>
          </motion.section >

          {/* section recent projects */}
          < motion.section
            id="projects"
            variants={textVariantFromButtom(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
          >
            <div className="w-full h-full pt-[100px]">
              <WordFadeIn words="Recent Projects" />
              <RecentProject />
            </div>
          </motion.section >

          {/* section my photography  */}
          < motion.section
            id="photography"
            variants={textVariantFromButtom(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
          >
            <div className="w-full h-full pt-[6rem] mt-20 ">
              <WordFadeIn words="My Photography" />
              <div className="container pt-10 ">
                <Expandable className="w-full min-w-72 storybook-fix" />
                <SeeMyPhotography />
              </div>
            </div>
          </motion.section >

          {/* section What do you want to do now? */}
          < motion.section
            id="photography"
            variants={textVariantFromButtom(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
          >
            <div className="w-full h-full  my-10">
              <WDYWTDN />
            </div>
          </motion.section >

          {/* section form contact */}
          < motion.section
            id="contact"
            variants={textVariantFromLeft(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
          >
            <div className="w-full h-full pt-10  mb-10 pb-10">
              <Contact />
            </div>
          </motion.section >
          <div>
            <Aurora
              colorStops={["#00D8FF", "#7CFF67", "#00D8FF"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
            />
          </div>

          {/* section for connection and footer */}
          <div className="w-full h-full p-10 bg-slate-50" >
            <Footer />
          </div >
        </motion.div >
      </main>
    </React.Fragment>
  );
}

