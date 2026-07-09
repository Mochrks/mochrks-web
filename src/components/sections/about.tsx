import React, { useRef } from "react";
import { PiGlobeSimpleBold } from "react-icons/pi";
import { Download } from "lucide-react";
import { Rizki } from "@/assets";
import { Icon } from "../ui/evervault-card";
import cvFile from "@/assets/docs/CV_NEW_ATS_MOCH. RIZKI KURNIAWAN.pdf";
import { motion, useInView } from "framer-motion";
import TextReveal from "@/components/ui/text-reveal";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Stagger container for coordinated child animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  // Image: scale up with fade
  const imageVariants = {
    hidden: { scale: 0.85, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Text block: slide up with fade
  const textVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Button: slide in from left with fade
  const buttonVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <React.Fragment>
      <div className="container sm:px-0 md:px-20">
        <header className="flex items-center justify-between pt-5 lg:pt-10">
          <TextReveal
            text="About me"
            as="h1"
            className="font-acorn scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl"
            delay={0}
            staggerDelay={0.06}
          />
          <motion.div
            initial={{ rotate: -180, opacity: 0 }}
            whileInView={{ rotate: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
          >
            <PiGlobeSimpleBold className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem]" />
          </motion.div>
        </header>
      </div>

      <motion.div
        ref={sectionRef}
        className="container flex flex-col lg:flex-row px-5 lg:px-20 py-10 lg:py-10 gap-10 lg:gap-20"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Profile Image Card */}
        <motion.div className="flex justify-center items-center" variants={imageVariants}>
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
        </motion.div>

        {/* Bio Text */}
        <motion.div className="w-full" variants={textVariants}>
          <article className="mt-2 lg:mt-10 pb-10 lg:pb-20">
            <motion.p
              className="max-w-full antialiased text-base leading-loose text-white md:text-lg lg:text-xl"
              variants={textVariants}
            >
              I'm Moch. Rizki Kurniawan - a Software Developer passionate about full-stack web
              development and UI/UX design. I specialize in building modern web applications using
              React, Vue.js, and Next.js, creating both powerful functionality and engaging user
              experiences. My background in UI/UX design ensures I craft interfaces that are not
              just technically sound but also intuitive and visually appealing. Beyond coding, my
              skills in photography, video production, and graphic design bring an extra creative
              dimension to every project. I'm ready to deliver innovative solutions for robust web
              applications, intuitive interfaces, and enhanced user experiences. Let's connect and
              create something amazing together!
            </motion.p>

            <motion.div
              className="mt-10 flex justify-center lg:justify-start"
              variants={buttonVariants}
            >
              <a
                href={cvFile}
                download="CV_MOCH_RIZKI_KURNIAWAN.pdf"
                className="group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-8 py-3 text-white rounded-full transform-gpu transition-transform duration-300 ease-in-out active:translate-y-[1px] gap-2 shadow-2xl"
                style={{ background: "rgba(0, 0, 0, 1)" }}
              >
                {/* Shimmer spark */}
                <div className="-z-30 blur-[2px] absolute inset-0 overflow-visible">
                  <div className="absolute inset-0 h-full animate-slide aspect-square">
                    <div
                      className="animate-spin-around absolute inset-[-100%] w-auto rotate-0"
                      style={{
                        background:
                          "conic-gradient(from 225deg, transparent 0, #ffffff 90deg, transparent 90deg)",
                      }}
                    />
                  </div>
                </div>
                {/* Highlight */}
                <div className="absolute inset-0 h-full w-full rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#ffffff1f] transform-gpu transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f]" />
                {/* Backdrop */}
                <div
                  className="absolute -z-20 rounded-full"
                  style={{ background: "rgba(0, 0, 0, 1)", inset: "0.05em" }}
                />
                {/* Content */}
                <Download className="w-5 h-5 relative z-10" />
                <span className="relative z-10 text-sm font-medium lg:text-base">
                  Download My CV
                </span>
              </a>
            </motion.div>
          </article>
        </motion.div>
      </motion.div>
    </React.Fragment>
  );
}
