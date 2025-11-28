import React, { useState, useEffect, lazy, Suspense } from "react"
import "@/styles/Home.css"
import { motion } from "framer-motion"
import { staggerContainer, textVariantFromButtom, textVariantFromTop, textVariantFromLeft } from "@/utils/motion.js"

import Navbar from "@/components/demo/Navbar"
import { Experience } from "@/components/demo/Experience"
import Expandable from "@/components/animata/corousel/expandable"
import WordFadeIn from "@/components/magicui/word-fade-in"
import { UIUXParallax } from "@/components/demo/UIUXParallax"
import About from "@/components/demo/About"
import { Skill } from "@/components/demo/Skill"
import Footer from "@/components/demo/Footer"
import { WDYWTDN } from "@/components/demo/WDYWTDN"
import { RecentProject } from "@/components/demo/RecentProject"
import { Contact } from "@/components/demo/Contact"
import { SeeMyPhotography } from "@/components/demo/SeeMyPhotography"
import { FlipWords } from "@/components/ui/flip-words"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
import Loading from "@/components/demo/Loading"
import Aurora from "@/components/demo/Aurora"
import CircularText from "@/components/demo/CircularText"
import { AnimatedSectionProps } from "@/types/home-page"
import { Skeleton } from "@/components/ui/skeleton"
import Orb from "@/components/demo/Orb"
import { skills } from "@/constants/variable"


const LazyVideo = lazy(() => import("@/components/demo/LazyVideo"))

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  id,
  variant,
  children,
  className,
  viewport,
}) => {
  return (
    <motion.section
      id={id}
      variants={variant}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default function Portfolio() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Loading />
  }



  const signature = [
    {
      text: "Mochrks",
      className: "text-slate-100",
    },
  ]

  return (
    <React.Fragment>
      <Navbar />
      <main>
        {/* Hero Section */}
        <motion.div
          variants={staggerContainer(0.3, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="hero relative"
        >
          <Suspense fallback={
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
              <div className="w-full h-full relative">

                <Skeleton className="absolute inset-0 w-full h-full bg-gray-800/90 dark:bg-gray-900/90 rounded-none" />
                <div className="absolute inset-0 flex items-center justify-start pl-4 md:pl-16 lg:pl-18 xl:pl-20 2xl:pl-40">
                  <div className="flex flex-col items-start gap-6 w-full px-4 sm:px-0">
                    <Skeleton className="h-4 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[800px] 2xl:max-w-[1000px] bg-gray-700 dark:bg-gray-600" />
                    <Skeleton className="h-4 w-full max-w-[225px] sm:max-w-[300px] md:max-w-[375px] lg:max-w-[450px] xl:max-w-[600px] 2xl:max-w-[750px] bg-gray-700 dark:bg-gray-600" />
                    <Skeleton className="h-4 w-full max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] xl:max-w-[400px] 2xl:max-w-[500px] bg-gray-700 dark:bg-gray-600" />
                    <Skeleton className="h-4 w-full max-w-[75px] sm:max-w-[100px] md:max-w-[125px] lg:max-w-[150px] xl:max-w-[200px] 2xl:max-w-[250px] bg-gray-700 dark:bg-gray-600" />
                  </div>
                </div>
              </div>
            </div>
          }>
            <LazyVideo />
          </Suspense>


          <div id="content">
            <motion.div
              variants={textVariantFromButtom(0.9)}
              className="text-start text-3xl md:text-4xl lg:text-6xl z-20 mx-auto text-cyan-200 dark:text-white-400 text-spaced"
            >
              <br />I invite you to explore my site to be better, <br />I am a <FlipWords words={skills} /> <br />
              Enjoy My Work
              <br />
              <div id="signature">
                <TypewriterEffectSmooth words={signature} />
              </div>
            </motion.div>

            <motion.div
              variants={textVariantFromButtom(0.9)}
              className="absolute buttom-10 xs:left-10 md:right-20 transform translate-x-0 translate-y-0"
            >
              <CircularText text="MOCHRKS*HELLO*WORLD*" onHover="speedUp" spinDuration={20} className="custom-class" />
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={staggerContainer(0.3, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="MainContent"
        >
          {/* UI/UX Section */}
          <AnimatedSection id="uiux" variant={textVariantFromTop(1.6)}>
            <div className="w-full h-full">
              <UIUXParallax />
            </div>
          </AnimatedSection>

          {/* Skills Section */}
          <AnimatedSection id="skill" variant={textVariantFromLeft(0.12)} viewport={{ once: false, amount: 0.45 }}>
            <div className="w-full h-full">
              <Skill />
            </div>
          </AnimatedSection>

          {/* About Section */}
          <AnimatedSection id="about" variant={textVariantFromButtom(0.12)}>
            <div className="w-full h-full">
              <About />
            </div>
          </AnimatedSection>

          {/* Experience Section */}
          <AnimatedSection id="experience" variant={textVariantFromButtom(0.12)}>
            <div className="w-full h-full pt-20">
              <WordFadeIn words="Experience" />
              <Experience />
            </div>
          </AnimatedSection>

          {/* Projects Section */}
          <AnimatedSection id="projects" variant={textVariantFromButtom(0.12)}>
            <div className="w-full h-full pt-[100px]">
              <WordFadeIn words="Recent Projects Github" />
              <RecentProject />
            </div>
          </AnimatedSection>

          {/* Photography Section */}
          <AnimatedSection id="photography" variant={textVariantFromButtom(0.12)}>
            <div className="w-full h-full pt-[6rem] mt-20">
              <WordFadeIn words="My Photography" />
              <div className="container pt-10">
                <Expandable className="w-full min-w-72 storybook-fix" />
                <SeeMyPhotography />
              </div>
            </div>
          </AnimatedSection>

          {/* WDYWTDN Section */}
          <AnimatedSection id="wdywtdn" variant={textVariantFromButtom(0.12)}>
            <div className="w-full h-full my-10">
              <WDYWTDN />
            </div>
          </AnimatedSection>

          {/* Contact Section */}
          <AnimatedSection id="contact" variant={textVariantFromLeft(0.12)}>
            <div className="w-full h-full pt-10 mb-10 pb-10">
              <Contact />
            </div>
          </AnimatedSection>

          {/* Aurora Effect */}
          <div>
            <Aurora colorStops={["#00D8FF", "#7CFF67", "#00D8FF"]} blend={0.5} amplitude={1.0} speed={0.5} />
          </div>

          {/* Footer */}
          <div className="w-full h-full p-10 bg-slate-50">
            <Footer />
          </div>
        </motion.div>
      </main>
    </React.Fragment>
  )
}
