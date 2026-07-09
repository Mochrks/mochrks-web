import React, { useState, useEffect, lazy, Suspense, useRef } from "react";
import "@/styles/Home.css";
import { motion } from "framer-motion";
import {
  staggerContainer,
  textVariantFromButtom,
  textVariantFromTop,
  textVariantFromLeft,
  revealFromBottom,
  scaleReveal,
  slideRevealLeft,
  slideRevealRight,
} from "@/utils/motion.js";
import { Download } from "lucide-react";

import Navbar from "@/components/layout/navbar";
import Expandable from "@/components/animata/corousel/expandable";
import WordFadeIn from "@/components/magicui/word-fade-in";
import TextReveal from "@/components/ui/text-reveal";
import Footer from "@/components/layout/footer";
import { FlipWords } from "@/components/ui/flip-words";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Loading from "@/components/layout/loading";
import Aurora from "@/components/ui/aurora";
import { AnimatedSectionProps } from "@/types/home-page";
import { Skeleton } from "@/components/ui/skeleton";
import { skills } from "@/constants/variable";
import cvFile from "@/assets/docs/CV_NEW_ATS_MOCH. RIZKI KURNIAWAN.pdf";
import { signature, personSchema } from "@/constants/data";

// Lazy load components
const Experience = lazy(() =>
  import("@/components/sections/experience").then((module) => ({ default: module.Experience }))
);
const UIUXParallax = lazy(() =>
  import("@/components/sections/uiux-parallax").then((module) => ({ default: module.UIUXParallax }))
);
const About = lazy(() => import("@/components/sections/about"));
const Skill = lazy(() =>
  import("@/components/sections/skill").then((module) => ({ default: module.Skill }))
);
const WDYWTDN = lazy(() =>
  import("@/components/sections/wdywtdn").then((module) => ({ default: module.WDYWTDN }))
);
const RecentProject = lazy(() =>
  import("@/components/sections/recent-project").then((module) => ({
    default: module.RecentProject,
  }))
);
const Contact = lazy(() =>
  import("@/components/sections/contact").then((module) => ({ default: module.Contact }))
);
const SeeMyPhotography = lazy(() =>
  import("@/components/sections/see-my-photography").then((module) => ({
    default: module.SeeMyPhotography,
  }))
);
const LazyVideo = lazy(() => import("@/components/ui/lazy-video"));

const LazyLoadSection = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full h-full">
      {isVisible ? (
        <Suspense
          fallback={
            <div className="h-96 flex items-center justify-center">
              <Loading />
            </div>
          }
        >
          {children}
        </Suspense>
      ) : (
        <div className="h-96" />
      )}
    </div>
  );
};

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
      viewport={viewport || { once: true, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

import SEO from "@/components/layout/seo";
import ScrollToTopButton from "@/components/layout/scroll-to-top-button";

export default function Portfolio() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <SEO
        title="Moch. Rizki Kurniawawn | Software Developer"
        description="Welcome to the personal portfolio of Moch. Rizki Kurniawan (@mochrks). A passionate Fullstack Software Developer and UI/UX Designer crafting robust, intuitive, and visually stunning web applications."
        keywords="Moch. Rizki Kurniawan, mochrks, software developer, fullstack developer, UI/UX design, photography, portfolio, React developer, Next.js, Vue.js, ASP.NET Core, Indonesia"
        path="/"
        schema={personSchema}
      />
      <Navbar />
      <main>
        {/* Hero Section */}
        <div className="hero relative">
          <Suspense
            fallback={
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
            }
          >
            <LazyVideo />
          </Suspense>

          <motion.div
            id="content"
            variants={staggerContainer(0.3, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
          >
            <motion.div
              variants={textVariantFromButtom(0.9)}
              className="relative inline-block text-start text-3xl md:text-4xl lg:text-6xl z-20 mx-auto text-cyan-200 dark:text-white-400 text-spaced font-[Acorn]"
            >
              <br />
              <span className="relative inline-block">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-6 md:-top-10 -left-6 md:-left-12 text-cyan-200 dark:text-white-400 opacity-90"
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 md:w-12 md:h-12"
                  >
                    <path d="M12 0C12 6.62742 17.3726 12 24 12C17.3726 12 12 17.3726 12 24C12 17.3726 6.62742 12 0 12C6.62742 12 12 6.62742 12 0Z" />
                  </svg>
                </motion.div>
                I invite you to explore my site to be better,
              </span>
              <br />I am a <FlipWords words={skills} />
              <br />
              <span className="relative inline-block">
                Enjoy My Work
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 -translate-y-1/2 -right-8 md:-right-14 text-cyan-200 dark:text-white-400 opacity-90"
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 md:w-10 md:h-10"
                  >
                    <path d="M12 0C12 6.62742 17.3726 12 24 12C17.3726 12 12 17.3726 12 24C12 17.3726 6.62742 12 0 12C6.62742 12 12 6.62742 12 0Z" />
                  </svg>
                </motion.div>
              </span>
              <br />
              <div id="signature">
                <TypewriterEffectSmooth words={signature} />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="MainContent">
          {/* UI/UX Section */}
          <AnimatedSection id="uiux" variant={revealFromBottom(0.1)}>
            <LazyLoadSection>
              <UIUXParallax />
            </LazyLoadSection>
          </AnimatedSection>

          {/* Skills Section */}
          <AnimatedSection
            id="skill"
            variant={slideRevealLeft(0.1)}
            viewport={{ once: true, amount: 0.15 }}
          >
            <LazyLoadSection>
              <Skill />
            </LazyLoadSection>
          </AnimatedSection>

          {/* About Section */}
          <AnimatedSection id="about" variant={revealFromBottom(0.1)}>
            <LazyLoadSection>
              <About />
            </LazyLoadSection>
          </AnimatedSection>

          {/* Experience Section */}
          <AnimatedSection id="experience" variant={revealFromBottom(0.1)}>
            <div className="w-full h-full pt-20">
              <TextReveal
                text="Experience"
                as="h2"
                className="font-acorn scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center"
                delay={0.1}
              />
              <LazyLoadSection>
                <Experience />
              </LazyLoadSection>
            </div>
          </AnimatedSection>

          {/* Projects Section */}
          <AnimatedSection id="projects" variant={slideRevealRight(0.1)}>
            <div className="w-full h-full pt-[100px]">
              <TextReveal
                text="Recent Projects Github"
                as="h2"
                className="font-acorn scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center"
                delay={0.1}
              />
              <LazyLoadSection>
                <RecentProject />
              </LazyLoadSection>
            </div>
          </AnimatedSection>

          {/* Photography Section */}
          <AnimatedSection id="photography" variant={scaleReveal(0.1)}>
            <div className="w-full h-full pt-[6rem] mt-20">
              <TextReveal
                text="My Photography"
                as="h2"
                className="font-acorn scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center"
                delay={0.1}
              />
              <div className="container pt-10">
                <Expandable className="w-full min-w-72 storybook-fix" />
                <LazyLoadSection>
                  <SeeMyPhotography />
                </LazyLoadSection>
              </div>
            </div>
          </AnimatedSection>

          {/* WDYWTDN Section */}
          <AnimatedSection id="wdywtdn" variant={revealFromBottom(0.1)}>
            <div className="w-full h-full my-10">
              <LazyLoadSection>
                <WDYWTDN />
              </LazyLoadSection>
            </div>
          </AnimatedSection>

          {/* Contact Section */}
          <AnimatedSection id="contact" variant={slideRevealLeft(0.1)}>
            <div className="w-full h-full pt-10 mb-10 pb-10">
              <LazyLoadSection>
                <Contact />
              </LazyLoadSection>
            </div>
          </AnimatedSection>

          {/* Aurora Effect */}
          <div>
            <Aurora
              colorStops={["#00D8FF", "#7CFF67", "#00D8FF"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
            />
          </div>

          {/* Footer */}
          <div className="w-full h-full p-10 bg-slate-50">
            <Footer />
          </div>
        </div>
        <ScrollToTopButton />
      </main>
    </React.Fragment>
  );
}
