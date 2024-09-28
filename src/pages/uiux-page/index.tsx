import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FocusCards } from "@/components/ui/focus-cards";
import ScrollToTopButton from '@/components/demo/ScrollToTopButton'
interface Project {
  id: number
  title: string
  description: string
  imageUrl: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "UI/UX Mobile MYPETS",
    description: "A modern take on online for pets",
    imageUrl: "https://mochrks.github.io/assets/img-design/M-1_11_11zon.jpg"
  },
  {
    id: 2,
    title: "UI/UX Mobile POLISIKU",
    description: "Redesign mobile apps polisiku",
    imageUrl: "https://mochrks.github.io/assets/img-design/M-2_12_11zon.jpg"
  },

];


const cards = [
  {
    title: "UI/UX Web Earphone Products",
    src: "https://mochrks.github.io/assets/img-design/A_11_11zon.jpg",
  },
  {
    title: "UI/UX Web Shoes Products",
    src: "https://mochrks.github.io/assets/img-design/B_12_11zon.jpg",
  },
  {
    title: "UI/UX Web Travel",
    src: "https://mochrks.github.io/assets/img-design/C_13_11zon.jpg",
  },
  {
    title: "UI/UX Web Drone Products",
    src: "https://mochrks.github.io/assets/img-design/D_1_11zon.jpg",
  },
  {
    title: "UI/UX Web Cars Products",
    src: "https://mochrks.github.io/assets/img-design/E_2_11zon.jpg",
  },
  {
    title: "UI/UX Web  Company Profile",
    src: "https://mochrks.github.io/assets/img-design/F_3_11zon.jpg",
  },
  {
    title: "UI/UX Web Nfts",
    src: "https://mochrks.github.io/assets/img-design/G_4_11zon.jpg",
  },
  {
    title: "UI/UX Web Portfolio",
    src: "https://mochrks.github.io/assets/img-design/H_5_11zon.jpg",
  },
  {
    title: "UI/UX Web Shop T-Shirt Brand",
    src: "https://mochrks.github.io/assets/img-design/I_6_11zon.jpg",
  },
  {
    title: "UI/UX Web Restaurant",
    src: "https://mochrks.github.io/assets/img-design/J_7_11zon.jpg",
  },
  {
    title: "UI/UX Web Phone Products",
    src: "https://mochrks.github.io/assets/img-design/K_8_11zon.jpg",
  },
  {
    title: "UI/UX Web AI Robotics Products",
    src: "https://mochrks.github.io/assets/img-design/L_9_11zon.jpg",
  },
  {
    title: "UI/UX Web Fruit Drinks",
    src: "https://mochrks.github.io/assets/img-design/M_10_11zon.jpg",
  },
  {
    title: "UI/UX Web Watch Products",
    src: "https://mochrks.github.io/assets/img-design/N_13_11zon.jpg",
  },
  {
    title: "UI/UX Web Headphone Products",
    src: "https://mochrks.github.io/assets/img-design/O_1_11zon.jpg",
  },
  {
    title: "UI/UX Web Batik",
    src: "https://mochrks.github.io/assets/img-design/P_2_11zon.jpg",
  },
  {
    title: "UI/UX Web E-Commerce Products",
    src: "https://mochrks.github.io/assets/img-design/Q_3_11zon.jpg",
  },
  {
    title: "UI/UX Web Product Bag",
    src: "https://mochrks.github.io/assets/img-design/R_4_11zon.jpg",
  },
  {
    title: "UI/UX Web Caffe In Forest",
    src: "https://mochrks.github.io/assets/img-design/S_5_11zon.jpg",
  },
  {
    title: "UI/UX Web Multi-chain Gen Z Platform",
    src: "https://mochrks.github.io/assets/img-design/T_6_11zon.jpg",
  },

];

export default function index() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (projects.length - 3))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (projects.length - 3)) % (projects.length - 3))
  }
  return (
    <div className="relative  w-full">
      <Title />
      <div className='flex bg-white/10'>
        <div className='flex max-w-xl items-center justify-center px-5'>
          <div className='flex'>
            <Avatar className='w-[3rem] h-[3rem] mt-4 '>
              <AvatarImage src="https://mochrks.github.io/assets/img-photo/pf.jpg" alt="@mochrks" />
              <AvatarFallback>MR</AvatarFallback>
            </Avatar>
            <div className='px-5'>
              <h2 className='scroll-m-20 text-2xl font-extrabold tracking-tight lg:text2xl'>Mochrks</h2>
              <p className="text-sm leading-1 [&:not(:first-child)]:mt-1">
                Once upon a time, in a far-off land, there was a very lazy king who
                spent all day lounging on his throne.
              </p>
            </div>
          </div>
        </div>
        <div className=" py-12 px-6 sm:px-6 lg:px-8 ">
          <div className="max-w-full mx-auto">
            <div className="relative">
              <div className="overflow-hidden">
                <motion.div
                  className="flex"
                  animate={{ x: `${-currentIndex * 25}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {projects.map((project) => (
                    <motion.div
                      key={project.id}
                      className="flex-shrink-0 px-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Card className="h-full">
                        <CardHeader className="p-0">
                          <div className="relative w-[35rem]  h-[15rem] lg:h-[25rem] overflow-hidden rounded-t-lg">
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="w-full h-[15rem] lg:h-[25rem] object-cover"
                            />
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 bg-white/10">
                          <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                          <CardDescription>{project.description}</CardDescription>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2  rounded-full shadow-lg"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2  rounded-full shadow-lg"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className=' w-full h-full p-6 lg:p-20 '>
        <FocusCards cards={cards} />
      </div>
      <ScrollToTopButton />
    </div >
  );
}



export const Title = () => {
  return (
    <section className=" place-content-center gap-2 bg-white px-8 py-14 lg:py-24 text-black">
      <FlipLink>DESIGN </FlipLink>
      <FlipLink>UI /UX.</FlipLink>
    </section>
  );
};
const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"

      className="relative block overflow-hidden whitespace-nowrap text-5xl font-black uppercase sm:text-7xl md:text-7xl lg:text-8xl 2xl:text-9xl"
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};